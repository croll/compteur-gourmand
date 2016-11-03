import { Injectable } from '@angular/core';
import { StoredContribution, Contribution } from '../db/contribution';
import { StoredUser, User } from '../db/user';
import { Event, StoredEvent, Commitment } from '../db/event';

@Injectable()
export class UserContributions {

  user: User;
  contributions: Contribution[];
  activeCommitments: Commitment[];
  savedMoney = 0;
  savedM2 = 0;

  constructor(private storedUser: StoredUser, private storedContribution: StoredContribution, private storedEvent: StoredEvent) {
  }

  init() {
    console.log("INIT contrib");
    return new Promise((resolve, reject) => {
      this.user = new User();
      this.contributions = [];
      this.storedEvent.getActiveEvent().then((e: Event) => {
        this.activeCommitments = e.getActiveCommitments();
        resolve(this.activeCommitments);
      }, () => {
          console.log("ERROR gettings active commitments list");
          resolve(false);
      });
    })
  }

  cancel() {
    this.user = new User();
    this.contributions = undefined;
  }

  save() {
    // Save the user
    return new Promise((resolve, reject) => {

      let userPromise;

      if (typeof(this.user._id) == 'undefined') {
        userPromise = new Promise((resolve, reject) => {
            this.storedUser.put(this.user).then((res) => {
              this.user._id = res._id;
              resolve(this.user._id);
            }).catch((err) => {
              reject(err)
            });
          }
        );
      } else {
        userPromise =  new Promise(() => {
          resolve(this.user._id);
        });
      }

      userPromise.then(() => {
          let promises = [];

          this.contributions.forEach((c) => {
            console.log("Push contribution !")
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

        }, (err) => {
              console.log("user save failed: ", err);
              alert("Impossible de sauver le user : "+err);
        });
    });

  }

  has(commitment: Commitment) {
    if (typeof(this.contributions) != 'object') return;
    let ret = false;
    this.contributions.forEach((c) => {
      if (c.id_commitment == commitment.id) {
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

  removeContribution(commitment: Commitment) {
    this.contributions.forEach((c, i) => {
        if (c.id_commitment == commitment.id) {
          this.contributions.splice(i, 1);
        }
    });
  }

}
