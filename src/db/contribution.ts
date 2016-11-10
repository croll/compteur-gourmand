import { Injectable } from '@angular/core';
import { Database } from '../app/database.service';
import { Store, Storable } from './store';

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
  constructor(db: Database) {
    super(Contribution, db, Store.milliroute("contribution/"), "contribution/", "contribution0");
  }

  // get Event contributions of this event
  getEventContributions(id_event: string) : Promise<Contribution[]> {
    return this.db.getDb().find({
      selector: {
        id_event: id_event
      },
      //sort: ['timestamp']
    }).then(function (result) {
      let contributions = result.docs.map((doc) => {
        return new Contribution(doc);
      });
      return contributions;
    });
  }

}
