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
          let json=`[{"id":"configuration/main","key":"configuration/main","value":{"rev":"36-b4a7a90159a1845023847394bd3d7c0a"},"doc":{"enable_physical_button":true,"use_external_screen":false,"lastname_is_mandatory":true,"contact_is_mandatory":true,"city_is_mandatory":false,"section":"main","id_active_event":"event/1478007181819","_id":"configuration/main","_rev":"36-b4a7a90159a1845023847394bd3d7c0a"}},{"id":"contribution/1478254006316","key":"contribution/1478254006316","value":{"rev":"1-3684e8feec056bb94958090e772fa6bc"},"doc":{"nb_of_unit":1,"nb_of_person":1,"id_commitment":"commitment/3076af45-38a9-b117-6a1f-194f4db4a1cf","id_user":"user/1478254006297","_id":"contribution/1478254006316","_rev":"1-3684e8feec056bb94958090e772fa6bc"}},{"id":"contribution/1478254057171","key":"contribution/1478254057171","value":{"rev":"1-814dfebfdd5dbfe4fed99613e06d8664"},"doc":{"nb_of_unit":1,"nb_of_person":1,"id_commitment":"commitment/3076af45-38a9-b117-6a1f-194f4db4a1cf","id_user":"user/1478254057128","_id":"contribution/1478254057171","_rev":"1-814dfebfdd5dbfe4fed99613e06d8664"}},{"id":"contribution/1478254173945","key":"contribution/1478254173945","value":{"rev":"1-59430539178a7bd2c0342584508047bb"},"doc":{"nb_of_unit":1,"nb_of_person":1,"id_commitment":"commitment/3076af45-38a9-b117-6a1f-194f4db4a1cf","id_user":"user/1478254173870","_id":"contribution/1478254173945","_rev":"1-59430539178a7bd2c0342584508047bb"}},{"id":"contribution/1478255237279","key":"contribution/1478255237279","value":{"rev":"1-ca6e334f96216333839b8ed347ed1db3"},"doc":{"nb_of_unit":1,"nb_of_person":1,"id_commitment":"commitment/3076af45-38a9-b117-6a1f-194f4db4a1cf","id_user":"user/1478255237200","_id":"contribution/1478255237279","_rev":"1-ca6e334f96216333839b8ed347ed1db3"}},{"id":"event/1478007181819","key":"event/1478007181819","value":{"rev":"14-e3e3dd35edc96a303f18859659389d2a"},"doc":{"name":"eva","description":"aa","start_date":"2016-01-01","end_date":"2016-01-01","commitments":[{"name":"a","short_description":"a","description":"a","logo":"a","ask_for_persons":0,"ask_for_periodicity":0,"m2_saved_by_unit":0,"euros_saved_by_unit":0,"order":0,"active":false},{"name":"b","short_description":"c","description":"d","logo":"e","ask_for_persons":0,"ask_for_periodicity":0,"m2_saved_by_unit":0,"euros_saved_by_unit":0,"order":0,"active":false},{"name":"z","short_description":"qs","description":"q","logo":"z","ask_for_persons":0,"ask_for_periodicity":0,"m2_saved_by_unit":0,"euros_saved_by_unit":0,"order":0,"active":false},{"name":"a","short_description":"a","description":"a","logo":"a","ask_for_persons":0,"ask_for_periodicity":0,"m2_saved_by_unit":0,"euros_saved_by_unit":0,"order":0,"active":false},{"id":"commitment/3076af45-38a9-b117-6a1f-194f4db4a1cf","name":"cccaa","short_description":"qzef","description":"qzef","logo":"qzfe","ask_for_persons":0,"ask_for_periodicity":0,"m2_saved_by_unit":"1","euros_saved_by_unit":"1","order":"1","active":true},{"id":"","name":"qsefq qzefq qzef","short_description":"qzef","description":"qzef","image":"qz ef qzeqz e","logo":"qzef","ask_for_persons":0,"ask_for_periodicity":0,"m2_saved_by_unit":"2","euros_saved_by_unit":"3","order":0,"active":true},{"id":"commitment/0f00545c-fcc3-d037-d4ac-f45e840f8ad5","name":"qzef ee","short_description":"sd fs sf","description":"sfe fs ","image":"se sfe ","logo":"esfsef  se","ask_for_persons":0,"ask_for_periodicity":0,"m2_saved_by_unit":"2","euros_saved_by_unit":"3","order":0,"active":true}],"_id":"event/1478007181819","_rev":"14-e3e3dd35edc96a303f18859659389d2a"}},{"id":"user/1478254006297","key":"user/1478254006297","value":{"rev":"1-c546322ccce1923e1f9cf8dae4dc7aa1"},"doc":{"firstname":"qsd","_id":"user/1478254006297","_rev":"1-c546322ccce1923e1f9cf8dae4dc7aa1"}},{"id":"user/1478254057128","key":"user/1478254057128","value":{"rev":"1-f95169a7db3bae6cdbba35fc23b4b4e5"},"doc":{"firstname":"qsd","_id":"user/1478254057128","_rev":"1-f95169a7db3bae6cdbba35fc23b4b4e5"}},{"id":"user/1478254173870","key":"user/1478254173870","value":{"rev":"1-c04a5d71d25d34993600d277b2205fd2"},"doc":{"firstname":"qzd","_id":"user/1478254173870","_rev":"1-c04a5d71d25d34993600d277b2205fd2"}},{"id":"user/1478255237200","key":"user/1478255237200","value":{"rev":"1-4c6a50d40468ffba41a66190bb409b0f"},"doc":{"firstname":"qzef","_id":"user/1478255237200","_rev":"1-4c6a50d40468ffba41a66190bb409b0f"}}]`;

        }
        this._db.allDocs({
          include_docs: true,
          attachments: true
        }).then(function(docs) {
          console.log(JSON.stringify(docs.rows));
        });
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
