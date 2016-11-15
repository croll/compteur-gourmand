declare var tinymce: any;

import {
  Directive,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output
} from '@angular/core';
import { UserContributions } from '../providers/user-contributions';
import { FileChooser, File, FileEntry } from 'ionic-native';
declare var cordova: any;

// import 'tinymce/tinymce.min.js';
// import 'tinymce/themes/modern/theme';

import { Database } from './database.service';

@Directive({
  selector: '[tinymce]'
})

export class TinyMCEDirective implements OnDestroy, AfterViewInit {

  @Input() bindTo: string;
  @Input() form: any;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter(false);
  @Output() onEditorKeyup = new EventEmitter<any>();
  @HostListener('onEditorKeyup', ['$event']) onEditorKeyupped(editor) {
    if (!this.form) {
      return;
    }
    let obj = {}
    obj[this.bindTo] = editor.getContent();
    this.form.patchValue(obj);
  }
  @HostListener('click') onClick() {
    if (typeof(this.editor) == 'undefined') {
      if (this.userContributions.isAdmin != true) {
        return;
      }
      this._initEditor().then((res: {editor: any, id: string}) => {
        this.editor = res.editor;
        tinymce.execCommand("mceAddControl", true, res.id)
      });
    } else {
      this.editor.show();
    }
  }
  // @HostListener('document:click', ['$event']) onClick(e) {

  //   // e.preventDefault();
  //   // e.stop();
  //   // e.stopPropagation();
  //   console.log(e.target.targetElement);
  //   console.log(this.editor);
  //   console.log(this.editor.isHidden());
  // }


  editor: any;
  myString;
  elName: string;


  constructor(private el: ElementRef, private db: Database, private userContributions: UserContributions) {
    this.myString = {_id: '', text: ''};
  }

  _initEditor() {
    return new Promise((resolve, reject) => {
        let id: string = (+new Date().getTime() + Math.random()).toString().replace('.', '');
        this.el.nativeElement.setAttribute('id', id);
        this.editor = tinymce.init({
          selector: '#' + this.el.nativeElement.getAttribute('id'),
          // inline: true,
          menubar: false,
          toolbar: 'customsave | undo redo | bold italic underline strikethrough | fontsizeselect | forecolor | backcolor | alignleft aligncenter alignright alignjustify | image',
          plugins: 'textcolor colorpicker image autoresize fullscreen',
          paste_data_images: true,
          skin_url: '/assets/skins/lightgray',
          image_description: false,
          fontsize_formats: '1rem 1.5rem 2rem 2.5rem 3rem 3.5rem 4rem',
          inline: true,
          mode: 'exact',
          // autoresize_max_height: 200,
          width: '100%',
          file_browser_callback: (field_name, url, type, win) => {
            this.processImageFile().then((base64) => {
              this.editor.execCommand('insertHTML', false, '<img src="' + base64 + '">');
            }, (err) => {
              console.log("Error processing image");
            })
          },
          setup: editor => {
            editor.on('keyup', () => {
              this.onEditorKeyup.emit(editor);
            });
            if (!this.form) {
              editor.addButton('customsave', {
                text: 'Enregistrer',
                icon: false,
                onclick: () => {
                  // this.ngModelChange.emit(this.el.nativeElement.innerHTML);
                    this.myString.text = this.editor.getContent();
                    this.db.getDb().put(this.myString).then((response) => {
                      this.myString._rev = response.rev;
                    }, (err) => {
                      console.log(err);
                    });
                  this.editor.hide();
                }
              });
            }
            resolve({editor: editor, id: id});
          }
        });
      });
  }

  ngAfterViewInit() {
    if (!this.form) {
      return this.getFromDb();
    } else {
      return new Promise((resolve, reject) => {
        this.myString = {
          _id: '',
          text: this.form.controls.description
        };
        setTimeout(() => {this.el.nativeElement.innerHTML = this.form.controls.description.value}, 100);
        resolve(this.form.controls.description);
      });
    }
  }

  getFromDb() {
    let text = "Lorem ipsum";
    return new Promise((resolve, reject) => {
      this.db.getDb().get(this.bindTo).then((myString) => {
      if (myString.text == "") {
        if (this.el.nativeElement.innerHTML) {
          myString.text = this.el.nativeElement.innerHTML;
        } else {
          myString.text = text;
        }
      }
      this.myString = myString;
      }, (err) => {
        if (err.name == 'not_found') {
          if (this.el.nativeElement.innerHTML) {
            text = this.el.nativeElement.innerHTML;
          }
          this.myString = {_id: this.bindTo, text: text};
        }
      }).then(() => {
          this.el.nativeElement.innerHTML = this.myString.text;
          resolve();
      });
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

  processImageFile() {
    return FileChooser.open().then((uri) => {
      return this.processURI(uri);
    });
  }

  processURI(uri: string) {

    return new Promise((resolve, reject) => {

        File.resolveLocalFilesystemUrl(uri).then((fe: FileEntry) => {

          fe.file((file) => {
            var r = new window['FileReader']();
             r.onloadend = function(e) {
               resolve(this.result);
             }
             r.onerror = function(err) {
               console.log("Erreur lors du traitement de l'image");
               console.log("Error loading file");
             }
            r.readAsDataURL(file);
          });
        }, (err) => {
          console.log("Error getting file", err);
          reject(err);
        });
      });

  }
}
