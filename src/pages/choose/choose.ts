import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { CommitmentChoicePage } from '../commitment-choice/commitment-choice';
import { StoredConfiguration, Configuration } from '../../db/configuration';
import { StoredEvent, Commitment } from '../../db/event';
import { UserContributions } from '../../providers/user-contributions';

@Component({
  selector: 'page-choose',
  templateUrl: 'choose.html'
})
export class ChoosePage {

  list: Commitment[];
  configuration: Configuration;

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private store_config: StoredConfiguration, private store_event: StoredEvent, public userContributions: UserContributions, private alertCtrl: AlertController) {}

  ionViewDidLoad() {

    this.store_config.get("configuration/main").then((configuration) => {
      this.configuration = configuration;

      this.store_event.get(this.configuration.id_active_event).then((cg_event) => {
        this.list = cg_event.commitments;
      }).catch((err) => {
        alert("erreur de recuperation l'evenement actif: "+err);
      });

    }).catch((err) => {
        alert("immpossible de charger la configuration generale: "+err);
    });

    if (typeof(this.userContributions.user) == 'undefined') {
      this.userContributions.init();
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
    if (this.userContributions.has(commitment._id)) {
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
