import { Injectable } from '@angular/core';
import { Database } from '../app/database.service';
import { Store, Storable } from './store';

import docuri from 'docuri';

export class Configuration extends Storable {
  _id: string
  _rev: string

  enable_physical_button: boolean = true;
  use_external_screen: boolean = true;
  lastname_is_mandatory: boolean = false;
  contact_is_mandatory: boolean = false;
  city_is_mandatory: boolean = false;
}

@Injectable()
export class StoredConfiguration extends Store<Configuration> {
  constructor(db: Database) {
    super(Configuration, db, docuri.route("configuration"), "configuration", "configuration");
  }
}
