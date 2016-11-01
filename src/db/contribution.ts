import { Injectable } from '@angular/core';
import { Database } from '../app/database.service';
import { Store, Storable } from './store';

export class Contribution extends Storable {
  _id: string
  _rev: string

  id_user: string
  id_commitment: string

  nb_of_unit: number
  nb_of_person: number
  timestamp: Date

  setValues(values) {
    super.copyHelper(['_id',
      '_rev',
      'id_user',
      'id_commitment',
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
}
