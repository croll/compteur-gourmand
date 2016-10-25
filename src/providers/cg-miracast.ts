import { Injectable, EventEmitter } from '@angular/core';
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

  constructor() {
    console.log("CgMiracast...");
    this.init();
  }

  private init() {
      let rootelem = document.querySelector('ion-app');
      switch(rootelem.getAttribute("cg-part")) {
          case "tablette":
            this.initTablette();
          break;
          case "presentation":
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
            this.session = navigator.presentation.requestSession("display.html");
            this.session.onmessage = (msg) => {
                this.onmessage.emit(msg);
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

}
