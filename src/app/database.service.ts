import { Injectable } from '@angular/core';

import PouchDB from 'pouchdb';
//import docuri from 'docuri';

@Injectable()
export class Database {

  //private _db: PouchDB.Database<any>;
  private _db: any;

    public event = {
      _id: '',
      name: '',
      description: '',
      active: 0,
      start_date: null,
      end_date: null,
      configuration: {
        mandatory_fields: [],
        enable_physical_button: true,
        use_external_screen: true
      }
    }

    commitment = {
      _id: '',
      name: '',
      short_description : '',
      description : '',
      logo: '',
      ask_for_persons: 0,
      ask_for_periodicity: 0,
      m2_saved_by_unit: 0,
      euros_saved_by_unit: 0,
      order: 0,
      active: 0
    }

    globalConfig = {
      strings: {
        _id: '',
        text: ''
      },
      commitments: [] // Array of commitments
    }

    user_commitment = {
      commitment: null,
      nb_of_unit: 0,
      nb_of_person: 0,
      timestamp: 0
    }

    contribution = {
      _id: '',
      event: null,
      user_commitments: [], // array of user_commitment
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
      window.PouchDB=PouchDB; // hack to enable pouchdb inspector
      this._db = new PouchDB('compteurgourmand');
      this._db.info().then((infos) => {
        console.log("db infos: ", infos);
      }).catch((err) => {
        console.log("db infos failed: ", err);
      })
      // this._db.info().then((info: any) => {
      //    this._db.destroy();
      // });

      /*
      let event = new Event();
      event.name = "plop";
      event.make_id();
      console.log("event: ", event);
      this._db.put(event).then((res) => {
        console.log("event puted: ", res);
      }).catch((err) => {
        console.log("event puted failed: ", err);
      })
      */
    }

    public getDb() {
      return this._db;
    }

}
