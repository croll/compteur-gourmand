import { Component } from '@angular/core';

import { NavController, ModalController, Events, MenuController } from 'ionic-angular';
import { Keyboard } from 'ionic-native';
import { FootprintPage } from '../footprint/footprint';
import { ChoosePage } from '../choose/choose';
import { UserContributions } from '../../providers/user-contributions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isAdmin = false;
  count: number = 0;
  timer: any;
  keyboardopened = false;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public userContributions: UserContributions, private events: Events, private menuCtrl: MenuController) {
    Keyboard.onKeyboardShow().subscribe(() => {
      console.log("onKeyboardShow");
      this.keyboardopened=true;
    });
    Keyboard.onKeyboardHide().subscribe(() => {
      console.log("onKeyboardHide");
      this.keyboardopened=false;
    });
    events.subscribe('user:logout', () => {
      this.userContributions.isAdmin = false;
    });
    this.timer = setInterval(() => {
      this.count = 0;
    }, 1500);
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

  showAdmin() {
    this.count++;
    if (this.count == 3) {
      this.userContributions.isAdmin = true;
      this.menuCtrl.open();
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

}
