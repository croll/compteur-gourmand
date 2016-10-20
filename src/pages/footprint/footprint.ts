import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Footprint page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-footprint',
  templateUrl: 'footprint.html'
})
export class FootprintPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello FootprintPage Page');
  }

}
