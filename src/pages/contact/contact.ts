import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserContributions } from '../../providers/user-contributions';
import { ContributePage } from '../contribute/contribute';
import { Configuration, StoredConfiguration } from '../../db/configuration';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  contactForm: FormGroup;
  contributePage: any = ContributePage;
  configuration: Configuration;
  lastnamePH: string = 'Nom de famille';
  contactPH: string = 'E-mail ou numéro de téléphone';
  cityPH: string = 'Ville';
  lastnameM: boolean = false;
  cityM: boolean = false;
  contactM: boolean = false;
  keyboardopened: boolean = false;

  constructor(public navCtrl: NavController, public userContributions: UserContributions, private formBuilder: FormBuilder, private storedConfiguration: StoredConfiguration) {

    Keyboard.onKeyboardShow().subscribe(() => {
      console.log("onKeyboardShow");
      this.keyboardopened=true;
    });
    Keyboard.onKeyboardHide().subscribe(() => {
      console.log("onKeyboardHide");
      this.keyboardopened=false;
    });

    this.contactForm = this.formBuilder.group({
      lastname: [''],
      firstname: [''],
      contact: [''],
      newsletter: [false],
      city: ['']
    });

  }

  ionViewDidLoad() {

    this.storedConfiguration.get("configuration/main").then((configuration: Configuration) => {
      this.configuration = configuration;
      this.contactForm.controls['firstname'].setValue(this.userContributions.user.firstname);
      if (configuration.lastname_is_mandatory) {
        this.lastnamePH+=' *';
        this.lastnameM = true;
      }
      if (configuration.city_is_mandatory) {
        this.cityPH+=' *';
        this.cityM = true;
      }
      if (configuration.contact_is_mandatory) {
        this.contactPH+=' *';
        this.contactM = true;
      }
    }).catch((err) => {
        alert("impossible de charger la configuration generale: "+err);
    });

  }

  save() {
    let values = this.contactForm.getRawValue();
    Object.assign(this.userContributions.user, values);
    this.userContributions.saveUser().then(() => {
       this.navCtrl.push(this.contributePage);
     }, (err) => {
       console.log("Unable to save the user", err)
       alert("Impossible de sauvegarder l'utilistaeur");
    });
  }

}
