import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
//import { Database } from '../../app/database.service';
import { StoredCommitment, Commitment } from '../../db/commitment';
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
  id: string;
  loadedDoc: Commitment;

  constructor(public navCtrl: NavController, private navParams: NavParams, private formBuilder: FormBuilder, private store: StoredCommitment, private alertCtrl: AlertController) {
    this.id = navParams.get('id') || null;
  }

  ionViewDidLoad() {
    console.log("paf2");
    this.form = this.formBuilder.group({
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

    if (this.id) {
      this.load(this.id);
    }
  }

  load(id: string) {
    return this.store.get(id).then((doc) => {
      this.loadedDoc = doc;
      this.id = this.loadedDoc._id;
      let e = {
        name: doc.name,
        short_description: doc.short_description,
        description: doc.description,
        logo: doc.logo,
        ask_for_persons: doc.ask_for_persons,
        ask_for_periodicity: doc.ask_for_periodicity,
        m2_saved_by_unit: doc.m2_saved_by_unit,
        euros_saved_by_unit: doc.euros_saved_by_unit,
        order: doc.order,
        active: doc.active,
      };
      this.form.setValue(e);
    });
  }

  save() {
    console.log("save...");
    let e = new Commitment(this.form.getRawValue());
    if (this.loadedDoc) {
      e._id = this.loadedDoc._id;
      e._rev = this.loadedDoc._rev;
    }
    this.store.put(e).then((res) => {
      console.log("commitment puted: ", res);
      return this.load(res.id).then((res) => {
        this.navCtrl.pop();
      })
    }).catch((err) => {
      console.log("commitment puted failed: ", err);
    });
  }

  remove() {
    this.store.remove(this.loadedDoc).then((res) => {
      this.id=undefined;
      this.loadedDoc=undefined;
      this.navCtrl.pop();
    }).catch((err)=>{
      alert("Impossible de supprmier : "+err);
    })
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
