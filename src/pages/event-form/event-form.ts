import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
//import { Database } from '../../app/database.service';
import { StoredEvent, Event } from '../../db/event';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the EventForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-form',
  templateUrl: 'event-form.html'
})
export class EventFormPage {

  form: FormGroup;
  id: string;
  loadedDoc: Event;

  constructor(public navCtrl: NavController, private navParams: NavParams, private formBuilder: FormBuilder, private store: StoredEvent, private alertCtrl: AlertController) {
    this.id = navParams.get('id') || null;
  }

  ionViewDidLoad() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      active: [false],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
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
        description: doc.description,
        active: doc.active,
        start_date: doc.start_date,
        end_date: doc.end_date,
      };
      this.form.setValue(e);
    });
  }

  save() {
    console.log("save...");
    let e = new Event(this.form.getRawValue());
    if (this.loadedDoc) {
      e._id = this.loadedDoc._id;
      e._rev = this.loadedDoc._rev;
    }
    this.store.put(e).then((res) => {
      console.log("event puted: ", res);
      return this.load(res.id).then((res) => {
        this.navCtrl.pop();
      })
    }).catch((err) => {
      console.log("event puted failed: ", err);
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

}
