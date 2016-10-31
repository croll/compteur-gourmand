import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommitmentFormPage } from '../commitment-form/commitment-form';
import { StoredConfiguration, Configuration } from '../../db/configuration';
import { StoredEvent, Event, Commitment } from '../../db/event';
import { ModalController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-commitment-list',
  templateUrl: 'commitment-list.html'
})
export class CommitmentListPage {

  list: Commitment[];
  cg_event: Event;
  configuration: Configuration;

  constructor(public navCtrl: NavController, private store_config: StoredConfiguration, private store_event: StoredEvent, private modalCtrl: ModalController) {
  }

  //ionViewDidLoad() {
  ionViewWillEnter() {
    // load general confifuration to take the active event id
    this.store_config.get("configuration/main").then((configuration) => {
      this.configuration = configuration;

      this.store_event.get(this.configuration.id_active_event).then((cg_event) => {
        this.cg_event = cg_event;
        this.list = cg_event.commitments;
        console.log("cg_e: ", this.cg_event);
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

  addFromOther() {
    let profileModal = this.modalCtrl.create(CommitmentAddModal, {
      cg_event: this.cg_event,
    });
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }
}

@Component({
  selector: 'page-commitment-list-add',
  templateUrl: 'commitment-list-add.html',
})
export class CommitmentAddModal {
  cg_event: Event;
  events: Event[] = [];
  index_cur_event: number = 0;
  index_cur_commitment: number = 0;
  new_type: string = "new";

  cur_event: Event = new Event({
    commitments: []
  });

  commitments: Commitment[] = [];
  commitment: Commitment;

  constructor(private navCtrl: NavController, private params: NavParams, private store_config: StoredConfiguration, private store_event: StoredEvent, private modalCtrl: ModalController) {
    this.cg_event = params.get('cg_event');
    this.store_event.list().then((res) => {
      this.events = res.docs;
      if (this.events.length > 0)
        this.setEvent(this.events[0]);
      console.log("events set");
    });
  }

  updateCurEvent() {
    this.setEvent(this.events[this.index_cur_event]);
  }
  updateCurCommitment() {
    this.setCommitment(this.commitments[this.index_cur_commitment]);
  }

  setEvent(e: Event) {
    this.cur_event = e;
    if (e.commitments && e.commitments.length > 0) {
      this.commitments = e.commitments;
      this.index_cur_commitment = 0;
      this.updateCurCommitment();
    } else {
      this.index_cur_commitment = -1;
      this.commitments = [];
      this.updateCurCommitment();
    }
  }

  setCommitment(c: Commitment) {
    this.commitment = c;
    console.log("this.commitment : ", this.commitment);
  }

  go() {
    this.navCtrl.pop();
    if (this.new_type == 'new') {
      this.navCtrl.push(CommitmentFormPage, {
        cg_event: this.cg_event,
      });
    } else if (this.new_type == 'import') {
      this.navCtrl.push(CommitmentFormPage, {
        cg_event: this.cg_event,
        copy_from: this.commitment,
      });
    }
  }
}
