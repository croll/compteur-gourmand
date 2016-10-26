import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-footprint',
  templateUrl: 'footprint.html'
})
export class FootprintPage {

  constructor(public navCtrl: NavController, private viewCtrl: ViewController) {}

  ionViewDidLoad() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
