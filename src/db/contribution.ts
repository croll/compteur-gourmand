import { Injectable } from '@angular/core';
import { Database } from '../app/database.service';
import { Store, Storable } from './store';
import { StoredUser } from './user';
import { Event } from './event';

// for csv export
//import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { json2csv } from 'json-2-csv';

export class Contribution extends Storable {
  _id: string
  _rev: string

  id_user: string
  id_commitment: string
  id_event: string

  nb_of_unit: number
  nb_of_person: number
  timestamp: Date

  setValues(values) {
    super.copyHelper(['_id',
      '_rev',
      'id_user',
      'id_commitment',
      'id_event',
      'nb_of_unit',
      'nb_of_person',
      'timestamp',
    ], values);
  }
}


@Injectable()
export class StoredContribution extends Store<Contribution> {
  constructor(db: Database, private storedUser: StoredUser) {
    super(Contribution, db, Store.milliroute("contribution/"), "contribution/", "contribution0");
  }

  // get totaux of this event
  getTotauxOfEvent(event: Event) : Promise<{ m2, euros }> {
    return this.getEventContributions(event).then((contributions) => {
      let total = {
        m2: 0,
        euros: 0,
      };
      contributions.forEach((contribution) => {
        let commitment = event.getCommitmentById(contribution.id_commitment);
        let nb_of_unit = contribution.nb_of_unit ? contribution.nb_of_unit : 1;
        let nb_of_person = contribution.nb_of_person ? contribution.nb_of_person : 1;

        total.m2 += commitment.m2_saved_by_unit * nb_of_unit * nb_of_person;
        total.euros += commitment.euros_saved_by_unit * nb_of_unit * nb_of_person;
      });
      return total;
    });
  }

  // get Event contributions of this event
  getEventContributions(event: Event) : Promise<Contribution[]> {
    return this.db.getDb().find({
      selector: {
        id_event: event._id
      },
      //sort: ['timestamp']
    }).then(function (result) {
      let contributions = result.docs.map((doc) => {
        return new Contribution(doc);
      });
      return contributions;
    });
  }

  getEventContributionsCSV(event: Event) : Promise<string> {
    let cols = [
      'Nom event',
      'Desc event',
      'Date debut',
      'Date fin',
      'Nom Engagement',
      'Nombre de m² sauvés',
      "Nombre d'€ économisés",
      "Fréquence",
      "Nombre de personnes",
      "Nom",
      "Prenom",
      "Contact",
      "Ville"
    ];

      return this.getEventContributions(event).then((contributions) => {
        var csvarray=[];

        let chain = Promise.resolve("");

        contributions.forEach((contribution) => {
          let commitment = event.getCommitmentById(contribution.id_commitment);
          let row = { };
          row['Nom event'] = event.name;
          row['Desc event'] = event.description;
          row['Date debut'] = event.start_date;
          row['Date fin'] = event.end_date;
          row['Nom Engagement'] = commitment.name;
          row['Nombre de m² sauvés'] = commitment.m2_saved_by_unit;
          row['Nombre d\'€ économisés'] = commitment.euros_saved_by_unit;
          row['Fréquence'] = contribution.nb_of_unit;
          row['Nombre de personnes'] = contribution.nb_of_person;

          chain=chain.then(() => {
            return this.storedUser.get(contribution.id_user).then((user) => {
              row['Nom']=user.lastname;
              row['Prenom']=user.firstname;
              row['Contact']=user.email;
              row['Ville']=user.city;

              csvarray.push(row);
              return "";
            });
          });

        });

        chain=chain.then(() => {
          return new Promise((resolve, reject) => {
            json2csv(csvarray, (err, csv) => {
              resolve(csv);
            }, {
              keys: cols,
              delimiter: {
                wrap: '"'
              }
            });
          });
        });

        return chain;
      });
  }

}
