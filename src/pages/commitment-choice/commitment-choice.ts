import { Component } from '@angular/core';
import { NavController, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-commitment-choice',
  templateUrl: 'commitment-choice.html'
})
export class CommitmentChoicePage {

  constructor(public navCtrl: NavController, private viewCtrl: ViewController) {}

  ionViewDidLoad() {
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
