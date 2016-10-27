import { Injectable } from '@angular/core';
import { Database } from '../app/database.service';
import { Store, Storable } from './store';

import docuri from 'docuri';

export class Commitment extends Storable {
  _id: string
  _rev: string

  name: string
  short_description : string
  description : string
  logo: string
  ask_for_persons: boolean
  ask_for_periodicity: boolean
  m2_saved_by_unit: number
  euros_saved_by_unit: number
  order: number
  active: boolean
}

@Injectable()
export class StoredCommitment extends Store<Commitment> {
  constructor(db: Database) {
    super(Commitment, db, docuri.route("commitment/:name"), "commitment/", "commitment0");
  }
}
