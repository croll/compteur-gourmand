import { Injectable } from '@angular/core';
import { Database } from '../app/database.service';
import { Store, Storable } from './store';

export class User extends Storable {
  _id: string
  _rev: string

  firstname: string
  lastname: string
  email: string
  phone: string
  city: string
  photo: string

  setValues(values) {
    super.copyHelper(['_id',
      '_rev',
      'firstname',
      'lastname',
      'contact',
      'city',
      'newsletter'
    ], values);
  }
}

@Injectable()
export class StoredUser extends Store<User> {
  constructor(db: Database) {
    super(User, db, Store.milliroute("user/"), "user/", "user0");
  }
}
