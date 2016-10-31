import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CommitmentFormPage } from '../commitment-form/commitment-form';
import { StoredConfiguration, Configuration } from '../../db/configuration';
import { StoredEvent, Event, Commitment } from '../../db/event';

@Component({
  selector: 'page-commitment-list',
  templateUrl: 'commitment-list.html'
})

export class CommitmentListPage {

  list: Commitment[];
  cg_event: Event;
  configuration: Configuration;

  constructor(public navCtrl: NavController, private store_config: StoredConfiguration, private store_event: StoredEvent) {
  }

  //ionViewDidLoad() {
  ionViewWillEnter() {
    // load general confifuration to take the active event id
    this.store_config.get("configuration/main").then((configuration) => {
      this.configuration = configuration;

      this.store_event.get(this.configuration.id_active_event).then((cg_event) => {
        this.cg_event = cg_event;
        this.list = cg_event.commitments;
      }).catch((err) => {
        alert("erreur de recuperation l'evenement actif: "+err);
      });

    }).catch((err) => {
        alert("immpossible de charger la configuration general: "+err);
    });

  }

  add() {
    this.navCtrl.push(CommitmentFormPage, {
      cg_event: this.cg_event,
    });
  }

  edit(index) {
    this.navCtrl.push(CommitmentFormPage, {
      cg_event: this.cg_event,
      index: index,
    });
  }

}
