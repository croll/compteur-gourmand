import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { CommitmentChoicePage } from '../commitment-choice/commitment-choice';
import { EngagementConfirmPage } from '../engagement-confirm/engagement-confirm';
import { Commitment } from '../../db/event';
import { UserContributions } from '../../providers/user-contributions';

@Component({
  selector: 'page-choose',
  templateUrl: 'choose.html'
})
export class ChoosePage {

  list: Commitment[];
  engagementConfirmPage: any = EngagementConfirmPage;

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, public userContributions: UserContributions, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    if (typeof(this.userContributions.user) == 'undefined' || typeof(this.userContributions.contributions) == 'undefined') {
      this.userContributions.init().then((cmts: Commitment[]) => {
          this.list = cmts;
      }, (err) => {
        console.log(err);
      });
    }
  }

  showCancelConfirm(event) {
    event.preventDefault();
    event.stopPropagation();

    this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Voulez vous vraiment quitter ?',
      buttons: [
        {
          text: 'Rester',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Quitter',
          handler: () => {
            this.userContributions.cancel();
            this.navCtrl.pop({animate: false});
          }
        }
      ]
    }).present();
  }

  showRemoveConfirm(commitment) {

    this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Souhaitez-vous vraiment retirer l\'engagement "'+commitment.name+'" de vos choix ?',
      buttons: [
        {
          text: 'Conserver',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.userContributions.removeContribution(commitment);
          }
        }
      ]
    }).present();
  }

  choose(commitment) {
    if (this.userContributions.has(commitment)) {
      this.showRemoveConfirm(commitment);
    } else {
      let modal = this.modalCtrl.create(CommitmentChoicePage, {commitment: commitment});
      modal.present();
    }
  }

  saveContribution() {
    console.log("Save contribution !");
    this.userContributions.save().then(function() {
      console.log("Contribution saved !");
      alert("TODO: Form infos user")
    }, function(err) {
      console.log(err);
      alert("Erreur lors de la sauvegarde !");
    })
  }

}
