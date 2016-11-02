import { Component } from '@angular/core';
import { NavController, ViewController, NavParams} from 'ionic-angular';
import { Commitment } from '../../db/event';
import { UserContributions } from '../../providers/user-contributions';
import { Contribution } from '../../db/contribution';

@Component({
  selector: 'page-commitment-choice',
  templateUrl: 'commitment-choice.html'
})
export class CommitmentChoicePage {

  commitment: Commitment;
  currentContribution: Contribution;

  constructor(public navCtrl: NavController, private viewCtrl: ViewController, private navParams: NavParams, private userContributions: UserContributions) {

  }

  ionViewDidLoad() {

    this.currentContribution = new Contribution();

    this.commitment = this.navParams.get('commitment');

    this.currentContribution.nb_of_unit = 1;
    this.currentContribution.nb_of_person = 1;
    this.currentContribution.id_commitment = this.commitment._id;

  }

  increment(what) {
    this.currentContribution[what]++;
  }

  decrement(what) {
    this.currentContribution[what]--;
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  submit() {
    this.userContributions.addContribution(this.currentContribution);
  }

}
