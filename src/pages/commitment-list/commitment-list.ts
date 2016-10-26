import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CommitmentFormPage } from '../commitment-form/commitment-form';
import { StoredCommitment } from '../../db/commitment';

@Component({
  selector: 'page-commitment-list',
  templateUrl: 'commitment-list.html'
})

export class CommitmentListPage {

  list: {}[];

  constructor(public navCtrl: NavController, private store: StoredCommitment) {
  }

  //ionViewDidLoad() {
  ionViewWillEnter() {
    this.store.list().then((res) => {
      console.log("res: ", res);
      let list = []
      res.rows.forEach((elem) => {
        list.push(elem.doc);
      });
      console.log("liste: ", list);
      this.list = list;
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
