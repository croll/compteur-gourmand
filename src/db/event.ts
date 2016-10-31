import { Injectable } from '@angular/core';
import { Database } from '../app/database.service';
import { Store, Storable } from './store';

//import docuri from 'docuri';

export class EventConfiguration {
  mandatory_fields: string[] = []
  enable_physical_button: boolean
  use_external_screen: boolean
}

export class Commitment {
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

  constructor(data = null) {
    if (data != null) {
      this.name=data.name;
      this.short_description = data.short_description;
      this.description = data.description;
      this.logo = data.logo;
      this.ask_for_persons = data.ask_for_persons;
      this.ask_for_periodicity = data.ask_for_periodicity;
      this.m2_saved_by_unit = data.m2_saved_by_unit;
      this.euros_saved_by_unit = data.euros_saved_by_unit;
      this.order = data.order;
      this.active = data.active;
    }
  }
}

export class Event extends Storable {
  _id: string
  _rev: string

  name: string
  description: string
  start_date: Date
  end_date: Date
  configuration: EventConfiguration
  commitments: Commitment[]
}

@Injectable()
export class StoredEvent extends Store<Event> {
  constructor(db: Database) {
    //super(Event, db, docuri.route("event/:name"), "event/", "event0");
    super(Event, db, function(obj) {
      if (('_id' in obj) && (obj._id.length > 0)) {
        return obj._id;
      } else {
        return "event/"+(new Date().getTime());
      }
    }, "event/", "event0");
  }
}
