import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserContributions } from '../../providers/user-contributions';

@Component({
  selector: 'page-engagement-confirm',
  templateUrl: 'engagement-confirm.html'
})
export class EngagementConfirmPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
  }

}
