import { Injectable } from '@angular/core';
import { Database } from '../app/database.service';
import { Store } from './store';

import docuri from 'docuri';

export class Event_Commitment {
  _id: string
  id_event: string
  id_commitment: string

  constructor(value = null) {
    if (value != null) {
      Object.assign(this, value);
    }
  }

}

@Injectable()
export class StoredEvent_Commitment extends Store {
  constructor(db: Database) {
    super(db, docuri.route("event_commitment/:id_event/:id_commitment"), "event_commitment/", "event_commitment0");
  }

  put(doc: Event) {
    return super.put(doc);
  }
}
