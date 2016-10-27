import { Injectable } from '@angular/core';
import { Database } from '../app/database.service';
import { Store, Storable } from './store';

import docuri from 'docuri';

export class EventConfiguration {
  mandatory_fields: string[] = []
  enable_physical_button: boolean = true
  use_external_screen: boolean = true
}

export class Event implements Storable {
  _id: string
  _rev: string

  name: string
  description: string
  active: boolean = false
  start_date: Date
  end_date: Date
  configuration: EventConfiguration = new EventConfiguration()

  constructor(value = null) {
    console.log("keys", Event.prototype);
    if (value != null) {
      Object.assign(this, value);
    }
  }

}

@Injectable()
export class StoredEvent extends Store<Event> {
  constructor(db: Database) {
    super(db, docuri.route("event/:name"), "event/", "event0");
  }
}
