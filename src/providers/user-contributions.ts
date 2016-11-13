import { Injectable } from '@angular/core';
import { StoredContribution, Contribution } from '../db/contribution';
import { StoredUser, User } from '../db/user';
import { Event, StoredEvent, Commitment } from '../db/event';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable()
export class UserContributions {

  user: User;
  contributions: Contribution[];
  activeEvent: Event;
  activeCommitments: Commitment[];
  savedMoney = 0;
  savedM2 = 0;
  isAdmin = false;

  constructor(private storedUser: StoredUser, private storedContribution: StoredContribution, private storedEvent: StoredEvent, private sanitizer: DomSanitizer) {
  }

  init() {
    return new Promise((resolve, reject) => {
      this.user = new User();
      this.contributions = [];
      this.storedEvent.getActiveEvent().then((e: Event) => {
        this.activeCommitments = e.getActiveCommitments();
        this.activeCommitments.sort((a: Commitment, b: Commitment):number => {
          return a.order - b.order;
        });
        resolve(true);
      }, () => {
          console.log("ERROR gettings active commitments list");
          resolve(false);
      });
    })
  }

  cancel() {
    this.savedMoney = 0;
    this.savedM2 = 0;
    this.user = new User();
    this.contributions = undefined;
  }

  saveUser() {
    return new Promise((resolve, reject) => {
        this.storedUser.put(this.user).then((res) => {
        this.user._id = res.id;
        resolve(this.user._id);
      }).catch((err) => {
        reject(err)
      });
      }
    );
  }

  save() {
    // Save the user
    return new Promise((resolve, reject) => {

      let userPromise;

      if (typeof(this.user._id) == 'undefined') {
        userPromise = this.saveUser();
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
    contribution.id_event = this.activeEvent._id;
    this.contributions.push(contribution);
    this.updateTotal(contribution, contribution.id_commitment, '+');
  }

  removeContribution(userCommitment: Commitment) {
    this.contributions.forEach((contribution, i) => {
        if (contribution.id_commitment == userCommitment.id) {
          this.contributions.splice(i, 1);
          this.updateTotal(contribution, userCommitment.id, '-');
        }
    });
  }

  updateTotal(contribution: Contribution, id_commitment: string, action: string) {

    let commitment = this.activeEvent.getCommitmentById(id_commitment);
    let totalM2 = commitment.m2_saved_by_unit * 365;
    let totalMoney = commitment.euros_saved_by_unit * 365;

    if (commitment.ask_for_persons) {
      totalM2 *= contribution.nb_of_person;
      totalMoney *= contribution.nb_of_person;
    }

    if (commitment.ask_for_periodicity) {
      totalM2 *= contribution.nb_of_unit;
      totalMoney *= contribution.nb_of_unit;
    }

    if (action == '+') {
      this.savedM2 += totalM2 ;
      this.savedMoney += totalMoney;
    } else {
      this.savedM2 -= totalM2 ;
      this.savedMoney -= totalMoney;
    }

  }

  sanitize(url: string):SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
