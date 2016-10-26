import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CommitmentChoicePage } from '../commitment-choice/commitment-choice';

@Component({
  selector: 'page-choose',
  templateUrl: 'choose.html'
})
export class ChoosePage {

  userCommitment = [];
  firstname = '';

  constructor(public navCtrl: NavController, private modalCtrl: ModalController) {}

  ionViewDidLoad() {
  }

  goBack() {
    this.navCtrl.pop();
  }

  openPopup() {
    console.log("ICI");
    let modal = this.modalCtrl.create(CommitmentChoicePage);
    modal.present();
  }

}
