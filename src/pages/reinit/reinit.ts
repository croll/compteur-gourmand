import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Database } from '../../app/database.service';

/*
  Generated class for the Reinit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reinit',
  templateUrl: 'reinit.html'
})
export class ReinitPage {

  constructor(public navCtrl: NavController, private db: Database) {}

  ionViewDidLoad() {
    console.log('Hello ReinitPage Page');
  }

  back() {
    this.navCtrl.pop();
  }

  reinit() {
    this.db.getDb().destroy().then((msg) => {
      console.log("msg: ", msg);
      location.reload();
    }).catch((err) => {
      alert("destroy failed: "+err);
    })
  }
}
