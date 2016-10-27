import { Injectable } from '@angular/core';
import { Database } from '../app/database.service';
import { Store, Storable } from './store';
import { Commitment } from './commitment';

import docuri from 'docuri';

export class Event_Commitment extends Storable {
  _id: string
  _rev: string
  id_event: string
  id_commitment: string
}

@Injectable()
export class StoredEvent_Commitment extends Store<Event_Commitment> {
  private static route_commitment_start = docuri.route("event_commitment/:id_event");
  constructor(db: Database) {
    super(Event_Commitment, db, docuri.route("event_commitment/:id_event/:id_commitment"), "event_commitment/", "event_commitment0");
  }

  list_commitments(id_event: string) : Promise<any> {
    return this.db.getDb().allDocs({
      include_docs: true,
      attachments: true,
      startkey: StoredEvent_Commitment.route_commitment_start({id_event: id_event})+"/",
      endkey: StoredEvent_Commitment.route_commitment_start({id_event: id_event})+"0",
    }).then((res) => {
      res.docs = [];
      res.rows.forEach((elem) => {
        res.docs.push(new Commitment(elem.doc));
      });
      return res;
    });
  }

}
