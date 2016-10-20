import { Injectable } from '@angular/core';

import PouchDB from 'pouchdb';

@Injectable()
export class Database {

    private _db: any;

    event = {
      _id: 0,
      name: '',
      active: 0,
      start_date: null,
      end_date: null,
      configuration: {
        mandatory_fields: [],
        enable_physical_button: true,
        use_external_screen: true
      }
    }

    committment = {
      _id: 0,
      title: '',
      subtitle: '',
      logo: '',
      popup_text: '',
      popup_image: '',
      validation_image: '',
      ideas_text: '',
      ask_for_persons: 0,
      ark_for_periodicity: 0,
      order: 0,
      m2_saved_by_unit: 0,
      euros_saved_by_unit: 0,
      active: 0
    }

    globalConfig = {
      strings: {
        _id: '',
        text: ''
      },
      committments: [] // Array of committments
    }

    user_committment = {
      committment: null,
      nb_of_unit: 0,
      nb_of_person: 0,
      timestamp: 0
    }

    contribution = {
      _id: 0,
      event: null,
      user_committments: [], // array of user_committment
      user: {
        _id: 0,
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        city: '',
        photo: '',
        newsletter: 0,
      }
    }

    constructor() {
      this._db = new PouchDB('compteurgourmand');
      this._db.info().then(function(info: any) {
         console.log(info);
      });
    }

    getDb() {
      return this._db;
    }

}
