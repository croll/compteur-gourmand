import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { FootprintPage } from '../footprint/footprint';
import { AdminPage } from '../admin/admin';
import { ChoosePage } from '../choose/choose';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  footprintPopover() {
    let popover = this.modalCtrl.create(FootprintPage);
    popover.present();
  }

  begin() {
    this.navCtrl.push(ChoosePage)
  }

  goToAdminPage() {
    this.navCtrl.push(AdminPage)
  }

}
