import { Injectable } from '@angular/core';
import { Database } from '../app/database.service';
import { Store, Storable } from './store';

import docuri from 'docuri';

export class Event_Commitment implements Storable {
  _id: string
  _rev: string
  id_event: string
  id_commitment: string

  constructor(value = null) {
    if (value != null) {
      Object.assign(this, value);
    }
  }

}

@Injectable()
export class StoredEvent_Commitment extends Store<Event_Commitment> {
  constructor(db: Database) {
    super(db, docuri.route("event_commitment/:id_event/:id_commitment"), "event_commitment/", "event_commitment0");
  }
}
