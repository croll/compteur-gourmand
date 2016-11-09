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

// import 'tinymce/tinymce.min.js';
// import 'tinymce/themes/modern/theme';

import { Database } from './database.service';

@Directive({
  selector: '[tinymce]'
})

export class TinyMCE implements OnDestroy, AfterViewInit {

  @Input() bindTo: String;
  @Output() onEditorKeyup = new EventEmitter<any>();
  @HostListener('onEditorKeyup', ['$event']) onEditorKeyupped(editor) {
    this.myString.text = editor.getContent();
  }
  @HostListener('click') onClick(editor) {
    if (typeof(this.editor) == 'undefined') {
      console.log("init editor");
      if (this.userContributions.isAdmin != true) {
        return;
      }
      this._initEditor().then((editor) => {
        this.editor = editor;
        this.editor.show();
      });
    } else {
      console.log("editor visible");
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
  }

  _initEditor() {
    return new Promise((resolve, reject) => {
        const id = (+new Date().getTime() + Math.random()).toString().replace('.', '');
        this.el.nativeElement.setAttribute('id', id);
        this.editor = tinymce.init({
          selector: '#' + this.el.nativeElement.getAttribute('id'),
          inline: true,
          menubar: false,
          toolbar: 'customsave | undo redo | bold italic underline strikethrough | bold italic | alignleft aligncenter alignright alignjustify | removeformat',
          plugins: [],
          skin_url: '/assets/skins/lightgray',
          setup: editor => {
            editor.on('keyup', () => {
              this.onEditorKeyup.emit(editor);
            });
            editor.on('init', () => {
                editor.show();
            });
            editor.addButton('customsave', {
              text: 'Enregistrer',
              icon: false,
              onclick: () => {
                this.save();
              }
            });
            resolve(editor)
          }
        });
      });
  }

  ngAfterViewInit() {
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

  save() {
    this.editor.hide();
    this.db.getDb().put(this.myString).then((response) => {
      this.myString._rev = response.rev;
    }, (err) => {
      console.log(err);
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
