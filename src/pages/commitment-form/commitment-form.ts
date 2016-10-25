import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Database } from '../../app/database.service';

/*
  Generated class for the CommitmentForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-commitment-form',
  templateUrl: 'commitment-form.html'
})
export class CommitmentFormPage {

  commitmentForm: any;
  title: string = "Créer un engagement";
  commitmentId: number;

  constructor(public navCtrl: NavController, private navParams: NavParams, private formBuilder: FormBuilder, private db: Database) {
    this.commitmentId = navParams.get('id') || null;
    if (this.commitmentId) {
      this.title = "Modifier un engagement";
    }
  }

  ionViewDidLoad() {
    this.commitmentForm = this.formBuilder.group({
      name: ['', Validators.required],
      short_description: ['', Validators.required],
      description: ['', Validators.required],
      logo: ['', Validators.required],
      ask_for_persons: 0,
      ask_for_periodicity: 0,
      m2_saved_by_unit: 0,
      euros_saved_by_unit: 0,
      order: 0,
      active: [false]
    });
  }

  save() {
    alert("TODO !");
  }

}
