import { Injectable, EventEmitter } from '@angular/core';
import { UserContributions } from '../providers/user-contributions';
import { Contribution, StoredContribution } from '../db/contribution';
import { Event, StoredEvent } from '../db/event';
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

  updateAll() {
    this.storedEvent.getActiveEvent().then((cg_event) => {
      return this.storedContribution.getTotauxOfEvent(cg_event).then((total) => {
        return this.session.postMessage({
          display_m2: total.m2,
          display_euros: total.euros,
          display_repas: Math.round(total.m2 / 10),
          display_merci: "plop",
        });
      });
    });
  }

}
