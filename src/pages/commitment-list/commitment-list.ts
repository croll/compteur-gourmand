import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the CommitmentList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-commitment-list',
  templateUrl: 'commitment-list.html'
})
export class CommitmentListPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello CommitmentListPage Page');
  }

}
