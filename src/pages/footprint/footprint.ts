import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'page-footprint',
  templateUrl: 'footprint.html'
})
export class FootprintPage {

  keyboardopened: boolean = false

  constructor(public navCtrl: NavController, private viewCtrl: ViewController) {
    Keyboard.onKeyboardShow().subscribe(() => {
      console.log("onKeyboardShow");
      this.keyboardopened=true;
    });
    Keyboard.onKeyboardHide().subscribe(() => {
      console.log("onKeyboardHide");
      this.keyboardopened=false;
    });
  }

  ionViewDidLoad() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
