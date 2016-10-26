import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { FootprintPage } from '../footprint/footprint';
import { ChoosePage } from '../choose/choose';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  choosePage;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this.choosePage = ChoosePage;
  }

  footprintPopover() {
    let modal = this.modalCtrl.create(FootprintPage);
    modal.present();
  }

  openPage(p) {
      this.navCtrl.push(p);
  }

}
