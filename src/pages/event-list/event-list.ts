import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventFormPage } from '../event-form/event-form';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html'
})

export class EventListPage {

  eventList: any;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {

    this.eventList = [
      {_id: '1', name: "Premier event de test", description: "La description de l'event", start_date: new Date(), end_date: new Date()},
      {_id: '2', name: "Deuxième event de test", description: "La description de l'event", start_date: new Date(), end_date: new Date()},
      {_id: '3', name: "Troisième event de test", description: "La description de l'event", start_date: new Date(), end_date: new Date()},
    ];
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
