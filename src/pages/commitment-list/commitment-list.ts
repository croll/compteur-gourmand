import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CommitmentFormPage } from '../commitment-form/commitment-form';
import { StoredCommitment, Commitment } from '../../db/commitment';

@Component({
  selector: 'page-commitment-list',
  templateUrl: 'commitment-list.html'
})

export class CommitmentListPage {

  list: Commitment[];

  constructor(public navCtrl: NavController, private store: StoredCommitment) {
  }

  //ionViewDidLoad() {
  ionViewWillEnter() {
    this.store.list().then((res) => {
      this.list = res.docs;
    }).catch((err) => {
      alert("erreur de recuperation de la liste: "+err);
    });
  }

  add() {
    this.navCtrl.push(CommitmentFormPage);
  }

  edit(id) {
    this.navCtrl.push(CommitmentFormPage, {
      id: id
    });
  }

}
