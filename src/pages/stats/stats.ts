import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Database } from '../../app/database.service';
import { StoredEvent, Event } from '../../db/event';
import { StoredUser, User } from '../../db/user';
import { StoredContribution, Contribution } from '../../db/contribution';

/*
  Generated class for the Stats page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage {

  event: any = {name: ''};
  contributions: Contribution[] = [];
  users: User[] = [];
  total: {m2, euros} = {m2: 0, euros: 0};

  constructor(public navCtrl: NavController, private db: Database, private storedEvent: StoredEvent, private storedUser: StoredUser, private storedContribution: StoredContribution) {

    storedEvent.getActiveEvent().then((event: Event) => {
      return event;
    }).then((event: Event) => {
      if (typeof(event) == 'undefined') {
        return [];
      }
      this.event = event;
      return storedContribution.getEventContributions(event);
    }).then((contributions: Contribution[]): Promise<User[]> => {
      if (typeof(contributions) == 'undefined' || contributions.length == 0) {
        return;
      }
      this.contributions = contributions;
      return new Promise((resolve, reject) => {
        let done = 0;
        let usersOfEvent: User[] = [];
        let userIds = [];

        contributions.forEach((contrib) => {

          let commitment = this.event.getCommitmentById(contrib.id_commitment);
          let nb_of_unit = contrib.nb_of_unit ? contrib.nb_of_unit : 1;
          let nb_of_person = contrib.nb_of_person ? contrib.nb_of_person : 1;

          this.total.m2 += commitment.m2_saved_by_unit * nb_of_unit * nb_of_person;
          this.total.euros += commitment.euros_saved_by_unit * nb_of_unit * nb_of_person;

          this.db.getDb().find({
            selector: {
              _id: contrib.id_user
            },
          }).then((result) => {
            result.docs.forEach((user) => {
              if (userIds.indexOf(user._id) == -1) {
                usersOfEvent.push(new User(user));
                userIds.push(user._id);
              }
              done++;
              if (done == contributions.length) {
                resolve(usersOfEvent);
              }
            });
          });
        });
      })
    }).then((users) => {
      this.users = users;
    }, (err) => {
      alert("Erreur lors de la récupération des statistiques");
      console.log(err);
    });
  }

  ionViewDidLoad() {
  }

  round(n: number) {
    return Math.round(n);
  }

}
