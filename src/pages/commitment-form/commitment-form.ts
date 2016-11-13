import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { StoredEvent, Event, Commitment } from '../../db/event';
import { AlertController } from 'ionic-angular';
//import { FileChooser, FilePath } from 'ionic-native';
import { FileChooser, File, FileEntry } from 'ionic-native';
declare var cordova: any;
/*
  Generated class for the CommitmentForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-commitment-form',
  templateUrl: 'commitment-form.html'
})
export class CommitmentFormPage {

  form: FormGroup;
  index: number;
  cg_event: Event;
  commitment: Commitment;
  copyFrom: Commitment;
  images = {logo: '', image: ''};

  constructor(public navCtrl: NavController, private navParams: NavParams, private formBuilder: FormBuilder, private store: StoredEvent, private alertCtrl: AlertController) {
    this.cg_event=navParams.get('cg_event') || null;
    this.index = navParams.get('index');
    if (typeof(this.index) != "number")
      this.index=null;
    this.copyFrom = navParams.get('copy_from');
    console.log("this.copyFrom: ", this.copyFrom);
    this.form = this.formBuilder.group({
      id: '',
      name: ['', Validators.required],
      short_description: ['', Validators.required],
      description: ['', Validators.required],
      logo: ['', Validators.required],
      image: ['', Validators.required],
      ask_for_persons: 0,
      ask_for_periodicity: 0,
      alternative_text: '',
      m2_saved_by_unit: 0,
      euros_saved_by_unit: 0,
      order: 0,
      active: [false]
    });
  }

  ionViewDidLoad() {

    if (typeof(this.index) == 'number') {
      this.load(this.index);
    }

    if (this.copyFrom) {
      console.log("copying from : ", this.copyFrom);
      this.form.setValue(this.copyFrom);
    }

  }


  load(index: number) {
    this.commitment = this.cg_event.commitments[index];
    this.form.setValue(this.commitment);
    this.images = {image: 'url('+this.commitment.image+')', logo: 'url('+this.commitment.logo+')'};
  }

  save() {
    event.preventDefault();
    event.stopPropagation();

    if (!('commitments' in this.cg_event) || !this.cg_event.commitments) {
      this.cg_event.commitments = [];
    }

    let e = new Commitment(this.form.getRawValue());
    if (typeof(this.index) == "number") {
      console.log("editing one");
      this.cg_event.commitments[this.index] = e;
    } else {
      console.log("adding one");
      this.cg_event.commitments.push(e);
    }

    console.log("saving: ", this.cg_event);

    return this.store.put(this.cg_event).then((res) => {
      console.log("saved commitment !");
      this.navCtrl.pop();
    }).catch((err) => {
      console.log("commitment puted failed: ", err);
      alert("Impossible de sauver : "+err);
    });
  }

  remove() {
    event.preventDefault();
    event.stopPropagation();

    this.cg_event.commitments.splice(this.index, 1);

    return this.store.put(this.cg_event).then((res) => {
      console.log("saved commitment !");
      this.navCtrl.pop();
    }).catch((err) => {
      console.log("commitment puted failed: ", err);
      alert("Impossible de sauver : "+err);
    });
  }

  showRemoveConfirm(event) {
    event.preventDefault();
    event.stopPropagation();
    let self=this;

    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Voulez vous vraiment supprimer cet évènement ?',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            self.remove();
          }
        }
      ]
    });
    confirm.present();
  }

  processImageFile(e, fieldName) {
    e.preventDefault();
    e.stopPropagation();
    FileChooser.open().then((uri) => {
      this.processURI(uri).then((base64) => {
        var obj = {};
        obj[fieldName] = base64;
        this.form.patchValue(obj);
        this.images[fieldName] = 'url('+base64+')';
      }, (err) => {
        console.log('Error processing image', err)
      })
    }, (err) => {
      console.log("Error choosing image", err)
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
