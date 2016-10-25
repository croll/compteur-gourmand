import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Presentation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-presentation',
  templateUrl: 'presentation.html'
})
export class Presentation {

  cool = "yo";

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Presentation Page');
  }

}
