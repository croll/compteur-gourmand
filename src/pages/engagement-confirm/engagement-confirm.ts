import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserContributions } from '../../providers/user-contributions';
import { ContactPage } from '../contact/contact';
import { Contribution } from '../../db/contribution';
import { Configuration, StoredConfiguration } from '../../db/configuration';

@Component({
  selector: 'page-engagement-confirm',
  templateUrl: 'engagement-confirm.html',
  host: { '(window:keydown)': 'buttonpressed($event)' },
})
export class EngagementConfirmPage {

  contributionList: Contribution[];
  commitments: {} = {};
  configuration: Configuration;

  constructor(public navCtrl: NavController, public userContributions: UserContributions, private storedConfiguration: StoredConfiguration) {}

  ionViewDidLoad() {
    this.contributionList = this.userContributions.contributions;
    this.userContributions.activeCommitments.forEach((commitment) => {
      this.commitments[commitment.id] = commitment;
    });

    this.storedConfiguration.get("configuration/main").then((configuration: Configuration) => {
      this.configuration = configuration;
      console.log(this.configuration);
    });
  }

  buttonpressed(event) {
    if (event.keyCode == 16) { // shift
      this.engage();
    }
  }

  getNbAsArray(nb: number) {
    let arr: Array<number> = [];
    for(let i=0;i<nb;i++) {
      arr.push(0);
    }
    return arr;
  }

  engage() {
    this.userContributions.save().then(() => {
      this.navCtrl.push(ContactPage);
    });
    // Errors already handled in userContributions.save().
  }

}
