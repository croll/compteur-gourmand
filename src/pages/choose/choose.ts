import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, AlertController, Slides } from 'ionic-angular';
import { CommitmentChoicePage } from '../commitment-choice/commitment-choice';
import { EngagementConfirmPage } from '../engagement-confirm/engagement-confirm';
import { UserContributions } from '../../providers/user-contributions';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'page-choose',
  templateUrl: 'choose.html'
})
export class ChoosePage {

  list = [];
  engagementConfirmPage: any = EngagementConfirmPage;
  keyboardopened: boolean = false
  @ViewChild('slider') slider: Slides;


  constructor(public navCtrl: NavController, private modalCtrl: ModalController, public userContributions: UserContributions, private alertCtrl: AlertController,private _elementRef: ElementRef) {
    Keyboard.onKeyboardShow().subscribe(() => {
      console.log("onKeyboardShow");
      this.keyboardopened=true;
    });
    Keyboard.onKeyboardHide().subscribe(() => {
      console.log("onKeyboardHide");
      this.keyboardopened=false;
    });
  }

  ionViewWillEnter() {
    console.log("ionViewCanEnter");
    let num = -1;
    for(let i = 0; i < this.userContributions.activeCommitments.length ; i++) {
      if (i % 3 == 0) {
        num++;
        this.list[num] = Array();
      }
      this.list[num].push(this.userContributions.activeCommitments[i]);
    }
  }

  ionViewDidLoad() {
    // Hack for ionic rc.2 to correcty initialize the swiper
    let swiperContainer = this._elementRef.nativeElement.getElementsByClassName('swiper-container')[0];
    this.waitRendered(swiperContainer).then(()=>{
      let swiper = this.slider.getSlider();
      swiper.update();
    });
  }

  nextCommitments() {
    this.slider.slideNext();
  }

  prevCommitments() {
    console.log(this.slider);
    console.log(this.slider.length());
    console.log(this.slider.isBeginning());
    console.log(this.slider.isEnd());
    this.slider.slideNext();
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

  waitRendered(element:HTMLElement):Promise<HTMLElement> {
    return new Promise((resolve) => {
        let checkNextFrame = () => {
            requestAnimationFrame(() => {
                if (element.clientWidth)
                    resolve(element);
                else
                    checkNextFrame();
            });
        };
        checkNextFrame();
    });
  }

}
