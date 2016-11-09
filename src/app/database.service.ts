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
        if (infos.doc_count <= 0) { // init the db
          let rows=[{"id":"configuration/main","key":"configuration/main","value":{"rev":"3-ac59a4324e71a835a7089d56f112236e"},"doc":{"enable_physical_button":false,"use_external_screen":false,"lastname_is_mandatory":true,"contact_is_mandatory":false,"city_is_mandatory":false,"section":"main","id_active_event":"event/1478624261077","_id":"configuration/main","_rev":"3-ac59a4324e71a835a7089d56f112236e"}},{"id":"event/1478624261077","key":"event/1478624261077","value":{"rev":"9-b6c5b33c778a8bf0ad22ac74d65db823"},"doc":{"name":"Un évênement de test","description":"Une petite description","start_date":"2016-01-01","end_date":"2016-01-01","commitments":[{"id":"1","name":"Je ne gaspille plus mon pain rassis","short_description":"Faites du pain perdu ou de la\nchapelure avec votre pain rassis !","description":"La description est à définir","image":"assets/img/bread.jpg","logo":"assets/img/bread-icon.png","ask_for_persons":true,"ask_for_periodicity":true,"m2_saved_by_unit":"25","euros_saved_by_unit":"9","order":0,"active":true},{"id":"2","name":"Je ne jette plus mes yaourts périmés","short_description":"Vos yaourts périmés sont toujours comestibles !","description":"La description qui va dans le popup","image":"assets/img/bread.jpg","logo":"assets/img/bread-icon.png","ask_for_persons":true,"ask_for_periodicity":true,"m2_saved_by_unit":"3","euros_saved_by_unit":"8","order":"1","active":true},{"id":"3","name":"J’opte pour un repas végétarien plus souvent","short_description":"Essayez un repas végétarien\nde temps en temps !","description":"La description","image":"assets/img/bread.jpg","logo":"assets/img/bread-icon.png","ask_for_persons":false,"ask_for_periodicity":true,"m2_saved_by_unit":"260","euros_saved_by_unit":"44","order":"3","active":true}],"_id":"event/1478624261077","_rev":"9-b6c5b33c778a8bf0ad22ac74d65db823"}}];
/*
          console.log("json 2");
          let rows=JSON.parse(json);
          */
          rows.forEach((row) => {
            if ('_rev' in row.doc)
              delete row.doc._rev
            this._db.put(row.doc).then((res) => {
              console.log("ok", row);
            }).catch((err) => {
              console.log("aie: ", err, row)
            });
          });
        } else {
          this._db.allDocs({
            include_docs: true,
            attachments: true
          }).then(function(docs) {
            console.log(JSON.stringify(docs.rows));
          });
        }
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
