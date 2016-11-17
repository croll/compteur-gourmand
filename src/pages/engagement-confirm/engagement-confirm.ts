import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from "ionic-angular/index";
import { UserContributions } from '../../providers/user-contributions';
import { ContactPage } from '../contact/contact';
import { Contribution } from '../../db/contribution';
import { Configuration, StoredConfiguration } from '../../db/configuration';
import { CgMiracast} from '../../providers/cg-miracast';
import { MediaPlugin } from 'ionic-native';

@Component({
  selector: 'page-engagement-confirm',
  templateUrl: 'engagement-confirm.html',
  host: { '(window:keydown)': 'buttonpressed($event)' },
})
export class EngagementConfirmPage {

  contributionList: Contribution[];
  commitments: {} = {};
  configuration: any = {};
  listenButton: boolean = false;
  mediaApplause: MediaPlugin = null;

  constructor(public navCtrl: NavController, public userContributions: UserContributions, private storedConfiguration: StoredConfiguration, private cg_miracast: CgMiracast, private platform: Platform) {
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.mediaApplause = new MediaPlugin('/android_asset/www/assets/audio/applause.mp3');
      }
    }).catch(err=> {
      console.log(JSON.stringify(err));
    });
  }

  ionViewCanEnter() {
    this.storedConfiguration.get("configuration/main").then((configuration: Configuration) => {
      this.configuration = configuration;
    });
    this.contributionList = this.userContributions.contributions;
    this.userContributions.activeCommitments.forEach((commitment) => {
      this.commitments[commitment.id] = commitment;
    });

  }

  ionViewDidLoad() {
    this.listenButton=true;
  }

  ionViewWillLeave() {
    this.listenButton=false;
  }

  buttonpressed(event) {
    if (this.listenButton && event.keyCode == 16) { // shift
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
      this.cg_miracast.updateAll(true);
      if (this.platform.is('android')) {
        this.mediaApplause.play();
      }

      this.navCtrl.push(ContactPage);
    });
    // Errors already handled in userContributions.save().
  }

  round(n) {
    return parseInt(n).toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
  }

}
