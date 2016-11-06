import { Component } from '@angular/core';

import { NavController, ModalController, Events } from 'ionic-angular';
import { FootprintPage } from '../footprint/footprint';
import { ChoosePage } from '../choose/choose';
import { UserContributions } from '../../providers/user-contributions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  host: { '(window:keydown)': 'listenKeyboard($event)' }
})
export class HomePage {

  pass = 'admin123';
  currentEntry = '';
  isAdmin = false;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private userContributions: UserContributions, private events: Events) {
    events.subscribe('user:logout', () => {
      this.isAdmin = false;
      console.log("MENU CLOSED");
    });
  }

  openPopup() {
    let modal = this.modalCtrl.create(FootprintPage);
    modal.present();
  }

  openPage(p) {
    this.navCtrl.push(p);
  }

  begin() {
    this.userContributions.init().then(() => {
      this.navCtrl.push(ChoosePage)
    })
  }

  listenKeyboard(event) {
    this.currentEntry += event.key;
    if (this.currentEntry.length > this.pass.length) {
      this.currentEntry = this.currentEntry.substr(1, this.currentEntry.length);
    }
    if (this.currentEntry == this.pass) {
      this.isAdmin = true;
    }
  }

}
