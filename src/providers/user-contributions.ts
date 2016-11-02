import { Injectable } from '@angular/core';
import { Contribution } from '../db/contribution';
import { StoredUser, User } from '../db/user';

@Injectable()
export class UserContributions {

  user: User;
  contributions: Contribution[];

  constructor() {}

  init() {
    console.log("UserContributions init !");
    this.user = new User();
    this.contributions = [];
  }

  cancel() {
    console.log("UserContributions cancel !");
    this.user = undefined;
    this.contributions = undefined;
  }

  save() {
  }

  addContribution(contribution: Contribution) {
    // Save the user if not exists
    console.log(this.user.firstname);

    // if (typeof(this.user._id) == 'undefined') {
    //   this.storedUser.put(this.user).then((res) => {
    //     console.log(res);
    //     this.user._id = res._id;
    //   }).catch((err) => {
    //     console.log("user save failed: ", err);
    //     alert("Impossible de sauver le user : "+err);
    //   });
    // }

    // Attach the user to each contribution

    // Save contribution
  }

  removeContribution() {

  }

}
