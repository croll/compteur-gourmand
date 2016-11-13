import { Component } from '@angular/core';
import { NavController, ViewController, NavParams} from 'ionic-angular';
import { Commitment } from '../../db/event'

@Component({
  selector: 'page-commitment-detail',
  templateUrl: 'commitment-detail.html'
})

export class CommitmentDetailPage {

  commitment: Commitment;

  constructor(public navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController) {
    this.commitment = this.navParams.get('commitment');
  }

  ionViewDidLoad() {
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

}
