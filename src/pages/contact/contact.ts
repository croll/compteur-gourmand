import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserContributions } from '../../providers/user-contributions';
import { ContributePage } from '../contribute/contribute';
import { Configuration, StoredConfiguration } from '../../db/configuration';

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

  constructor(public navCtrl: NavController, public userContributions: UserContributions, private formBuilder: FormBuilder, private storedConfiguration: StoredConfiguration) {}

  ionViewWillEnter() {
  }

  ionViewDidLoad() {

    this.storedConfiguration.get("configuration/main").then((configuration: Configuration) => {
      this.configuration = configuration;
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

    this.contactForm = this.formBuilder.group({
      lastname: [''],
      firstname: [this.userContributions.user.firstname],
      contact: [''],
      newsletter: [false],
      city: ['']
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
