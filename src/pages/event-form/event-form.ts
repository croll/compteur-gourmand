import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Database } from '../../app/database.service';

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

  eventForm: any;
  title: string = "Créér un nouvel événement";
  eventId: number;

  constructor(public navCtrl: NavController, private navParams: NavParams, private formBuilder: FormBuilder, private db: Database) {
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
  }

  save() {
    alert('todo !');
  }

}
