import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CommitmentFormPage } from '../commitment-form/commitment-form';

@Component({
  selector: 'page-commitment-list',
  templateUrl: 'commitment-list.html'
})
export class CommitmentListPage {

  commitmentList: any;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {

    this.commitmentList = [
        {_id: '1', name: "Je ne gaspille plus mon pain rassis", description: "La description", logo: ""},
        {_id: '2', name: "Je ne jette plus mes yaourts périmés", description: "La description", logo: ""},
        {_id: '3', name: "J’opte pour un repas végétarien plus souvent", description: "La description", logo: ""}
    ];

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
