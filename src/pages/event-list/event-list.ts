import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventFormPage } from '../event-form/event-form';
import { StoredEvent } from '../../db/event';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html'
})

export class EventListPage {

  eventList: {}[];

  constructor(public navCtrl: NavController, private store: StoredEvent) {

  }

  ionViewDidLoad() {
    this.store.list().then((res) => {
      console.log("res: ", res);
      let list = []
      res.rows.forEach((elem) => {
        list.push(elem.doc);
      });
      console.log("liste: ", list);
      this.eventList = list;
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
