import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventFormPage } from '../event-form/event-form';
import { StoredEvent, Event } from '../../db/event';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html'
})

export class EventListPage {

  list: Event[];

  constructor(public navCtrl: NavController, private store: StoredEvent) {
  }

  ionViewWillEnter() {
    this.store.list().then((res) => {
      this.list = res.docs;
    }).catch((err) => {
      alert("erreur de recuperation de la liste: "+err);
    });
  }

  add() {
    this.navCtrl.push(EventFormPage);
  }

  edit(id) {
    this.navCtrl.push(EventFormPage, {
      id: id
    });
  }

}
