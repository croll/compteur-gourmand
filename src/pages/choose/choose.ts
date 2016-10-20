import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-choose',
  templateUrl: 'choose.html'
})
export class ChoosePage {

  userCommitment = [];
  
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ChoosePage Page');
  }

  goBack() {
    this.navCtrl.pop();
  }

}
