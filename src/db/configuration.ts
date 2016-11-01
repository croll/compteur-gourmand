import { Injectable } from '@angular/core';
import { Database } from '../app/database.service';
import { Store, Storable } from './store';

import docuri from 'docuri';

export class Configuration extends Storable {
  _id: string
  _rev: string

  section: string;

  enable_physical_button: boolean = true;
  use_external_screen: boolean = true;
  lastname_is_mandatory: boolean = false;
  contact_is_mandatory: boolean = false;
  city_is_mandatory: boolean = false;
  id_active_event: string;

  setValues(values) {
    super.copyHelper(['_id',
      '_rev',
      'section',
      'enable_physical_button',
      'use_external_screen',
      'lastname_is_mandatory',
      'contact_is_mandatory',
      'city_is_mandatory',
      'id_active_event'
    ], values);
  }

  // if we want setting defauts to values, we must write this constructor
  constructor(values = null) {
    super();
    if (values)
      this.setValues(values);
  }
}

@Injectable()
export class StoredConfiguration extends Store<Configuration> {
  constructor(db: Database) {
    super(Configuration, db, docuri.route("configuration/:section"), "configuration/", "configuration0");
  }
}
