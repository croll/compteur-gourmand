import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

/*
  Generated class for the Upgrade page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-upgrade',
  templateUrl: 'upgrade.html'
})
export class UpgradePage {

  constructor(public navCtrl: NavController, private http: Http) {
    /*
    this.http.get('http://upgrade.croll.fr/compteur-gourmand/?version=1.0').then((res) => {

    });
    */
  }

  ionViewDidLoad() {
    console.log('Hello Upgrade Page');
  }

}
