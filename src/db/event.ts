import { Injectable } from '@angular/core';
import { Database } from '../app/database.service';
import { Store, Storable } from './store';

export class EventConfiguration {
  mandatory_fields: string[] = []
  enable_physical_button: boolean
  use_external_screen: boolean
}

export class Commitment extends Storable {
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

  setValues(values) {
    super.copyHelper(['name',
      'short_description',
      'description',
      'logo',
      'ask_for_persons',
      'ask_for_periodicity',
      'm2_saved_by_unit',
      'euros_saved_by_unit',
      'order',
      'active',
    ], values);
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

  setValues(values) {
    super.copyHelper(['_id',
      '_rev',
      'name',
      'description',
      'start_date',
      'end_date',
      'configuration',
      'commitments'
    ], values);
  }
}

@Injectable()
export class StoredEvent extends Store<Event> {
  constructor(db: Database) {
    super(Event, db, Store.milliroute("event/"), "event/", "event0");
  }
}
