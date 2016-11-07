import { Injectable } from '@angular/core';
import { Database } from '../app/database.service';
import { Store, Storable } from './store';
import { StoredConfiguration } from './configuration';

export class EventConfiguration {
  mandatory_fields: string[] = []
  enable_physical_button: boolean
  use_external_screen: boolean
}

export class Commitment extends Storable {
  id: string
  name: string
  short_description : string
  description : string
  image: string
  logo: string
  ask_for_persons: boolean
  ask_for_periodicity: boolean
  m2_saved_by_unit: number
  euros_saved_by_unit: number
  order: number
  active: boolean

  setValues(values) {
    super.copyHelper(['id',
      'name',
      'short_description',
      'description',
      'image',
      'logo',
      'ask_for_persons',
      'ask_for_periodicity',
      'm2_saved_by_unit',
      'euros_saved_by_unit',
      'order',
      'active',
    ], values);
  }

  // if we want setting defauts to values, we must write this constructor
  constructor(values = null) {
    super();
    if (values)
      this.setValues(values);
    else {
      this.id = 'commitment/'+Store.guid();
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

  getActiveCommitments() : Commitment[] {
    let cmts: Commitment[] = [];
    this.commitments.forEach((c) => {
      if (c.active === true) {
        cmts.push(c);
      }
    });
    return cmts;
  }

  getCommitmentById(id) {
    var cmt: Commitment;
    this.commitments.forEach((c) => {
      if (c.id == id) {
        cmt = c;
      }
    });
    return cmt;
  }

}

@Injectable()
export class StoredEvent extends Store<Event> {
  constructor(db: Database, private stored_config: StoredConfiguration) {
    super(Event, db, Store.milliroute("event/"), "event/", "event0");
  }

  getActiveEvent() {
    return new Promise((resolve, reject) => {
      this.stored_config.get("configuration/main").then((configuration) => {
        this.get(configuration.id_active_event).then((cg_event) => {
          resolve(cg_event);
        }).catch((err) => {
          reject(err);
          alert("erreur de recuperation l'evenement actif: "+err);
        });
      }).catch((err) => {
          reject(err);
          alert("immpossible de charger la configuration generale: "+err);
      });
    });
  }

}
