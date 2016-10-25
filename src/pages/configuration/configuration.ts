import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Database } from '../../app/database.service';

@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html'
})
export class ConfigurationPage {

  configuration;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private db: Database) {}

  ionViewDidLoad() {
    this.configuration = this.formBuilder.group({
      enable_physical_button: [true, Validators.required],
      use_external_screen: [true, Validators.required],
      lastname_is_mandatory: [false, Validators.required],
      contact_is_mandatory: [false, Validators.required],
      city_is_mandatory: [false, Validators.required]
    });
  }

  save() {
    alert("TODO !");
  }

}
