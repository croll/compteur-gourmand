import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
//import { Database } from '../../app/database.service';
import { StoredConfiguration, Configuration } from '../../db/configuration';
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
  configuration: Configuration;
  form: FormGroup;
  id: string;
  loadedDoc: Event;
  wasActive = false;

  constructor(public navCtrl: NavController, private navParams: NavParams, private formBuilder: FormBuilder, private store: StoredEvent, private store_config: StoredConfiguration, private alertCtrl: AlertController) {
    this.id = navParams.get('id') || null;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      active: [false],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    this.store_config.get("configuration/main").then((configuration) => {
      this.configuration = configuration;
    }).catch((err) => {
        alert("immpossible de charger la configuration general: "+err);
    });

    if (this.id) {
      this.load(this.id);
    } else {
      this.loadedDoc = new Event();
    }
  }

  load(id: string) {
    return this.store.get(id).then((doc) => {
      this.loadedDoc = doc;
      this.id = this.loadedDoc._id;
      this.wasActive = this.configuration.id_active_event == doc._id;
      let e = {
        name: doc.name,
        description: doc.description,
        start_date: doc.start_date,
        end_date: doc.end_date,
        active: this.wasActive,
      };
      this.form.setValue(e);
    });
  }

  save() {
    let values = this.form.getRawValue();
    this.loadedDoc.setValues(values);
    this.store.put(this.loadedDoc).then((res) => {

      // update active event in configuration object
      if (this.wasActive && values['active'] == false) {
        this.configuration.id_active_event = null;
      } else if (values['active'] == true) {
        this.configuration.id_active_event = res.id;
      }

      return this.store_config.put(this.configuration).then((res) => {
        this.navCtrl.pop();
      }).catch((err) => {
        alert("Impossible de sauver l'evenement actif : "+err);
      });
    }).catch((err) => {
      console.log("event puted failed: ", err);
      alert("Impossible de sauver : "+err);
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
