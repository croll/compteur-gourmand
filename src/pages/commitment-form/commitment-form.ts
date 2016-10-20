import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the CommitmentForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-commitment-form',
  templateUrl: 'commitment-form.html'
})
export class CommitmentFormPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello CommitmentFormPage Page');
  }

}
