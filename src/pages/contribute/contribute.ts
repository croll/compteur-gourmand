import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contribute',
  templateUrl: 'contribute.html'
})
export class ContributePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ContributePage Page');
  }

}
