import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-choose',
  templateUrl: 'choose.html'
})
export class ChoosePage {

  userCommitment = [];
  firstname = '';

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
  }

  goBack() {
    this.navCtrl.pop();
  }

}
