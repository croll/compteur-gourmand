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

  editor;
  myString;

  constructor(private el: ElementRef, private db: Database) {
  }

  ngAfterViewInit() {
    let text = "Lorem ipsum";
    // this.db.getDb().get(this.bindTo).then((s) => {
    //   console.log(s);
    // }, (err) => {
    //   console.log(err);
    // });
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
      } else {
        console.log(err);
      }
    }).then(() => {

      this.el.nativeElement.innerHTML = this.myString.text;

      const id = (+new Date().getTime() + Math.random()).toString().replace('.', '');
      this.el.nativeElement.setAttribute('id', id);
      tinymce.init({
        selector: '#' + this.el.nativeElement.getAttribute('id'),
        inline: true,
        menubar: false,
        toolbar: 'customsave | undo redo | bold italic underline strikethrough | removeformat',
        plugins: [],
        skin_url: '/assets/skins/lightgray',
        setup: editor => {
          this.editor = editor;
          editor.on('keyup', () => {
            this.onEditorKeyup.emit(editor);
          });
          editor.addButton('customsave', {
            text: 'Enregistrer',
            icon: false,
            onclick: () => {
              this.save();
            }
          });
        }

      });

    });
  }

  save() {
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
