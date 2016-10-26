import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
//import { Database } from '../../app/database.service';
import { StoredEvent, Event } from '../../db/event';

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

  eventForm: FormGroup;
  title: string = "Créér un nouvel événement";
  eventId: string;
  loadedEvent: Event;

  constructor(public navCtrl: NavController, private navParams: NavParams, private formBuilder: FormBuilder, private store: StoredEvent) {
    this.eventId = navParams.get('id') || null;
    if (this.eventId) {
      this.title = "Modifier un événement";
    }
  }

  ionViewDidLoad() {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      active: [false],
      start_date: ['', Validators.required],
      end_date: ['']
    });

    if (this.eventId) {
      this.store.get(this.eventId).then((doc) => {
        this.loadedEvent = doc;
        let e = {
          name: doc.name,
          description: doc.description,
          active: doc.active,
          start_date: doc.start_date,
          end_date: doc.end_date,
        };
        console.log("edit: ", doc, e);
        this.eventForm.setValue(e);
      });
    }
  }

  save() {
    let e = new Event(this.eventForm.getRawValue());
    if (this.loadedEvent) {
      e._id = this.loadedEvent._id;
      e._rev = this.loadedEvent._rev;
    }
    this.store.put(e).then((res) => {
      console.log("event puted: ", res);
      this.loadedEvent._rev = res.rev;
    }).catch((err) => {
      console.log("event puted failed: ", err);
    });
  }

}
