import { Injectable } from '@angular/core';
import { Database } from '../app/database.service';

import docuri from 'docuri';

export class EventConfiguration {
  mandatory_fields: string[] = []
  enable_physical_button: boolean = true
  use_external_screen: boolean = true
}

export class Event {

  _id: string
  name: string
  description: string
  active: boolean = false
  start_date: Date
  end_date: Date
  configuration: EventConfiguration = new EventConfiguration()

  constructor(value = null) {
    if (value != null) {
      Object.assign(this, value);
    }
  }

}

@Injectable()
export class StoredEvent {
  private static route = docuri.route("event/:name");
  constructor(private db: Database) {
  }

  list() {
    return this.db.getDb().allDocs({
      include_docs: true,
      attachments: true,
      startkey: 'event/',
      endkey: 'event0',
    })
  }

  put(event: any) {
    event._id = StoredEvent.route(event);
    return this.db.getDb().put(event);
  }

  get(id: string) {
    return this.db.getDb().get(id);
  }
}
