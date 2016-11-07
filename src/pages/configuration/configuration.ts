import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Database } from '../../app/database.service';
import { StoredConfiguration, Configuration } from '../../db/configuration';

@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html'
})
export class ConfigurationPage {

  form: FormGroup;
  loadedDoc: Configuration;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private db: Database, private store: StoredConfiguration) {
    this.form = this.formBuilder.group({
      enable_physical_button: [true, Validators.required],
      use_external_screen: [true, Validators.required],
      lastname_is_mandatory: [false, Validators.required],
      contact_is_mandatory: [false, Validators.required],
      city_is_mandatory: [false, Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log("DID LOAD");
    this.load();
  }

  load() {
    return this.store.get("configuration/main").then((doc) => {
      console.log("config loaded...", doc);
      this.loadedDoc = doc;
      let e = {
        enable_physical_button: doc.enable_physical_button,
        use_external_screen: doc.use_external_screen,
        lastname_is_mandatory: doc.lastname_is_mandatory,
        contact_is_mandatory: doc.contact_is_mandatory,
        city_is_mandatory: doc.city_is_mandatory,
      };
      this.form.setValue(e);
    }).catch((err) => {
      alert("failed to load main configuration");
    })
  }

  save() {
    console.log("config save: ", this.form.getRawValue());
    let e = new Configuration(this.form.getRawValue());
    if (this.loadedDoc) {
      e._id = this.loadedDoc._id;
      e._rev = this.loadedDoc._rev;
    }
    e.section="main";
    this.store.put(e).then((res) => {
      console.log("config saved...", res);
      this.navCtrl.pop();
    }).catch((err) => {
      console.log("configuration puted failed: ", err);
      alert("Impossible de sauver : "+err);
    });
  }

}
