import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserContributions } from '../../providers/user-contributions';
import { ContactPage } from '../contact/contact'

@Component({
  selector: 'page-engagement-confirm',
  templateUrl: 'engagement-confirm.html',
  host: { '(window:keydown)': 'buttonpressed($event)' },
})
export class EngagementConfirmPage {

  constructor(public navCtrl: NavController, private userContributions: UserContributions) {}

  ionViewDidLoad() {
  }

  buttonpressed(event) {
    if (event.keyCode == 16) { // shift
      this.engage();
    }
  }

  engage() {
    this.userContributions.save().then(() => {
      this.navCtrl.push(ContactPage);
    });
    // Errors already handled in userContributions.save().
  }

}
