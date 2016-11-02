import { Injectable } from '@angular/core';
import { StoredContribution, Contribution } from '../db/contribution';
import { StoredUser, User } from '../db/user';
import { Commitment } from '../db/event';

@Injectable()
export class UserContributions {

  user: User;
  contributions: Contribution[];
  savedMoney = 0;
  savedM2 = 0;

  constructor(private storedUser: StoredUser, private storedContribution: StoredContribution) {}

  init() {
    console.log("UserContributions init !");
    this.user = new User();
    this.contributions = [];
  }

  cancel() {
    console.log("UserContributions cancel !");
    this.contributions = undefined;

    // Delete the user if necessary
    // if (typeof(this.user._id) == 'undefined') {
    //   this.storedUser.remove(this.user).then((res) => {
    //     this.user = undefined;
    //   }).catch((err)=>{
    //     alert("Impossible de supprimer l'utilisateur: "+err);
    //   })
    // }
  }

  save() {
    // Save the user
    return new Promise((resolve, reject) => {

      if (typeof(this.user._id) == 'undefined') {
        this.storedUser.put(this.user).then((res) => {
          this.user._id = res._id;
        }).catch((err) => {
          console.log("user save failed: ", err);
          alert("Impossible de sauver le user : "+err);
        });
      }

      let promises = [];

      this.contributions.forEach((c) => {
        c.id_user = this.user._id;
        promises.push(this.storedContribution.put(c));
      });
      Promise.all(promises).then(() => {
        console.log("save ok");
        resolve(true);
      }, (err) => {
        console.log("Unable to save user contributions", err);
        alert("Impossible de sauver les contributions !"+err);
        reject(false);
      });

    });

  }

  has(commitment: Commitment) {
    let ret = false;
    this.contributions.forEach((c) => {
      if (c.id_commitment == commitment._id) {
          ret = true;
          return;
      }
    });
    return ret;
  }

  addContribution(contribution: Contribution) {
    this.contributions.push(contribution);
    // Hack to have numbers
    this.savedMoney += contribution.nb_of_unit * contribution.nb_of_person;
    this.savedM2 += contribution.nb_of_unit * contribution.nb_of_person;
  }

  removeContribution(id_commitment: string) {
    this.contributions.forEach((c, i) => {
        if (c._id == id_commitment) {
          console.log("REMOVE", i);
          this.contributions.splice(i, 1);
        }
    });
  }

}
