import { Injectable, EventEmitter } from '@angular/core';
import { UserContributions } from '../providers/user-contributions';
import { StoredContribution } from '../db/contribution';
import { StoredEvent } from '../db/event';
import 'rxjs/add/operator/map';

/*
  Generated class for the CgMiracast provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CgMiracast {

  private _mode: string;
  private session: any;
  public onmessage = new EventEmitter<any>()

  constructor(private userContributions: UserContributions, private storedContribution: StoredContribution, private storedEvent: StoredEvent) {
    console.log("CgMiracast...");
    //this.init();
  }

  public init() {
    let rootelem = document.querySelector('ion-app');
    switch(rootelem.getAttribute("cg-part")) {
      case "tablette":
        console.log("CgMiracast... tablette");
        this.initTablette();
      break;
      case "presentation":
      console.log("CgMiracast... presentation");
        this.initPresentation();
      break;
      default:
        console.error("Pas de cg-part !");
    }
  }

  private initTablette() {
    this._mode="tablette";
    navigator.presentation.onavailablechange = (screenEvent) => {
      if(screenEvent.available) {
        this.session = navigator.presentation.requestSession("presentation/index.html");
        this.session.onmessage = (msg) => {
          this.onmessage.emit(msg);
          this.updateAll(); // allez hop
        }; // we don't care this app
        this.session.onstatechange = function() {
          //button.disabled = self.session.state != "connected";
        }
      }
    };
    console.log("Miracast inited has Tablette mode");
  }

  private initPresentation() {
    this._mode="presentation";
    navigator.presentation.onpresent = (presentEvent) => {
      this.session = presentEvent.session;
      this.session.onmessage = (msg) => {
        this.onmessage.emit(msg);
      };
      this.session.onstatechange = function(){
        //div.innerText = session.state;
      }
    };
    console.log("Miracast inited has Presentation mode");
  }

  get mode() {
    return this._mode;
  }

  utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
  }

  updateAll(displayLastContrib: boolean = false) {
    console.log("update all ! "+displayLastContrib);
    this.storedEvent.getActiveEvent().then((cg_event) => {
      return this.storedContribution.getTotauxOfEvent(cg_event).then((total) => {
        let merci = '';
        if (displayLastContrib) {
          let commitment_list = '';
          let merci_tpl = "Grâce à ses engagements _COMMITMENTS_LIST_ sur un an, _USER_FIRSTNAME_ a économisé _TOTAL_EUROS_ € et vient de permettre de diminuer notre empreinte écologique de _TOTAL_M2_ m2 ! Bravo !";

          this.userContributions.contributions.forEach((contribution, i) => {
            let commitment = cg_event.getCommitmentById(contribution.id_commitment);
            if (i == 0) {
              commitment_list += '"'+commitment.name+'"';
            } else if (i < (this.userContributions.contributions.length - 1)) {
              commitment_list += ', "'+commitment.name+'"';
            } else {
              commitment_list += ' et "'+commitment.name+'"';
            }
          });

          merci_tpl = merci_tpl.replace('_COMMITMENTS_LIST_', commitment_list);
          merci_tpl = merci_tpl.replace('_USER_FIRSTNAME_', this.userContributions.user.firstname);
          //merci_tpl = merci_tpl.replace('_TOTAL_EUROS_', ""+this.userContributions.savedMoney);
          //merci_tpl = merci_tpl.replace('_TOTAL_M2_', ""+this.userContributions.savedM2);
          merci_tpl = merci_tpl.replace('_TOTAL_EUROS_', ""+this.userContributions.savedMoney.toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, '$1 '));
          merci_tpl = merci_tpl.replace('_TOTAL_M2_', ""+this.userContributions.savedM2.toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, '$1 '));

          merci = merci_tpl;
        }
        return this.session.postMessage(this.utf8_to_b64(JSON.stringify({
          display_m2: total.m2,
          display_euros: total.euros,
          display_repas: Math.round(total.m2 / 10),
          display_merci: merci,
        })));
      });
    });
  }

}
