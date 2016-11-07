import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
//import { Database } from '../../app/database.service';
import { StoredEvent, Event, Commitment } from '../../db/event';
import { AlertController } from 'ionic-angular';
import {FileChooser} from 'ionic-native';

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
      ask_for_persons: 0,
      ask_for_periodicity: 0,
      m2_saved_by_unit: 0,
      euros_saved_by_unit: 0,
      order: 0,
      active: [false]
    });
  }

  ionViewDidLoad() {

    console.log("this.index : ", this.index);
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

  fileChooserLogo() {
    FileChooser.open().then((uri) => {
        console.log(uri);
        this.form.patchValue({
          logo: uri,
        });
      }).catch((e) => {
        console.log(e);
      }
    );
  }

}
