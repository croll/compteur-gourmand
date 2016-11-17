import { Injectable } from '@angular/core';

import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBFind);


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
      alternative_text: '',
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
        // console.log("db infos: ", infos);
        if (infos.doc_count <= 0) { // init the db

/*
          console.log("json 2");
          let rows=JSON.parse(json);
          */
          let rows = [{"id":"_design/idx-1794f8427dabdb9606d0df70ccc6df01","key":"_design/idx-1794f8427dabdb9606d0df70ccc6df01","value":{"rev":"2-9c953f86b9c180be6bc1b11fedd390b2"},"doc":{"language":"query","views":{"idx-1794f8427dabdb9606d0df70ccc6df01":{"map":{"fields":{"id_event":"asc"}},"reduce":"_count","options":{"def":{"fields":["id_event"]}}}},"_id":"_design/idx-1794f8427dabdb9606d0df70ccc6df01","_rev":"2-9c953f86b9c180be6bc1b11fedd390b2"}},{"id":"configuration/main","key":"configuration/main","value":{"rev":"1-fa5d4e596e7f5046fafbd2933a7123aa"},"doc":{"enable_physical_button":false,"use_external_screen":false,"lastname_is_mandatory":true,"contact_is_mandatory":false,"city_is_mandatory":false,"section":"main","id_active_event":"event/1478624261077","_id":"configuration/main","_rev":"1-fa5d4e596e7f5046fafbd2933a7123aa"}},{"id":"event/1478624261077","key":"event/1478624261077","value":{"rev":"4-48e39f961163502be056fcd61ad8f834"},"doc":{"name":"Un évênement de test","description":"Une petite description","start_date":"2016-01-01","end_date":"2016-01-01","commitments":[{"id":"1","name":"Je ne gaspille plus mon pain rassis","short_description":"Faites du pain perdu ou de la\nchapelure avec votre pain rassis !","description":"<p style=\"font-size: 22.4px;\">Les rebuts alimentaires sont estim&eacute;s &agrave;&nbsp;<strong>20kg/pers/an</strong>&nbsp;dont&nbsp;<strong>14% de pain*.</strong></p>\n<p style=\"font-size: 22.4px;\">Soit 20*0,14/52=0,538kg/pers/semaine que nous r&eacute;duisons &agrave;&nbsp;<strong>50g/pers/semaine.</strong></p>\n<p style=\"font-size: 22.4px;\">&nbsp;</p>\n<p style=\"font-size: 22.4px;\">Les alternatives au gaspillage de pain sont nombreuses: en acheter moins ou l'utiliser dans de d&eacute;licieuses recettes !</p>\n<p style=\"font-size: 22.4px;\">&nbsp;</p>\n<table style=\"margin-left: auto; margin-right: auto\">\n<tbody>\n<tr>\n<td class=\"img-container\"><img src=\"assets/img/vignettes/chapelure.png\" alt=\"\" /></td>\n<td class=\"img-container\"><img src=\"assets/img/vignettes/pudding.png\" alt=\"\" /></td>\n<td class=\"img-container\"><img src=\"assets/img/vignettes/crumble.png\" alt=\"\" /></td>\n<td class=\"img-container\"><img src=\"assets/img/vignettes/brushetta.png\" alt=\"\" /></td>\n<td class=\"img-container\"><img src=\"assets/img/vignettes/pain-perdu.png\" alt=\"\" /></td>\n</tr>\n<tr>\n<td class=\"label-container\"><strong>Chapelure</strong></td>\n<td class=\"label-container\"><strong>Pudding</strong></td>\n<td class=\"label-container\"><strong>Crumble</strong></td>\n<td class=\"label-container\"><strong>Brushetta<strong/></td>\n<td class=\"label-container\"><strong>Pain perdu</strong></td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<p class=\"source\">* Source: Campagne \"Faut pas G&acirc;cher\" 2012 de France Nature Environnement</p>\n<p class=\"source\">reprenant en 2012 une &eacute;tude de l'Ademe de 2007</p>","image":"assets/img/commitments/bread.png","logo":"assets/img/commitments/bread-icon.png","ask_for_persons":true,"ask_for_periodicity":true,"alternative_text":"","m2_saved_by_unit":"24.96","euros_saved_by_unit":"8.84","order":0,"active":true},{"id":"2","name":"Je ne jette plus mes yaourts périmés","short_description":"Vos yaourts périmés sont toujours comestibles !","description":"<p>Un million de yaourts encore consommables sont jet&eacute;s chanque jour en France*. Si la cha&icirc;ne du froid a &eacute;t&eacute; respect&eacute;e, il est possible de manger des yaourts m&ecirc;me quelques jours apr&egrave;s la date de limite de consommation. &Agrave; l'aspect, &agrave; l'odeur et au go&ucirc;t, il est possible de reconna&icirc;tre qu'un yaourt n'est plus bon !</p>\n<p>Les yaourts peuvent servie aussi &agrave; confectionner de d&eacute;licieuses sauves de salde, des g&acirc;teaux sucr&eacute;s ou sal&eacute;s...</p>\n<p>Vous pouvez aussi&nbsp;<strong>diversifier les sources de calcium</strong>. De nombreux aliments en sont riches.</p>\n<p>&nbsp;</p>\n<table style=\"margin-left: auto; margin-right: auto;\">\n<tbody>\n<tr>\n<td class=\"img-container\"><img src=\"assets/img/vignettes/legumes-verts.png\" alt=\"\" /></td>\n<td class=\"img-container\"><img src=\"assets/img/vignettes/legumineuses.png\" alt=\"\" /></td>\n<td class=\"img-container\"><img src=\"assets/img/vignettes/algues.png\" alt=\"\" /></td>\n</tr>\n<tr>\n<td class=\"label-container\"><strong>L&eacute;gumes verts cultiv&eacute;s et sauvages</strong> (chou, &eacute;pinard, haricot vert, brocoli, fenouil, herbes aromatiques, cresson, ortie, pissenlit...)</td>\n<td class=\"label-container\"><strong>L&eacute;gumineuses</strong> (pois chiches, haricots blancs, lentilles...)</td>\n<td class=\"label-container\"><strong>Algues et fruits secs</strong> (amandes, noisettes, figues, abricots... )</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<p class=\"source\">*source: Planetoscope/ConsoGloble</p>","image":"assets/img/commitments/yaourt.png","logo":"assets/img/commitments/yaourt-icon.png","ask_for_persons":true,"ask_for_periodicity":true,"alternative_text":"","m2_saved_by_unit":"32.76","euros_saved_by_unit":"8.32","order":"1","active":true},{"id":"3","name":"J’opte pour un repas végétarien plus souvent","short_description":"Essayez un repas végétarien\nde temps en temps !","description":"<p>Les prot&eacute;ines ne sont pas exclusivement disponibles dans la viande, le poisson, les produits laitiers, les oeufs. Les&nbsp;<strong>c&eacute;r&eacute;ales, surtout semi-compl&egrave;tes ou completes</strong> (riz, bl&eacute;, sarrasin...), les&nbsp;<strong>l&eacute;gumineuses (</strong>lentilles, pois, haricots, f&egrave;ves...) et les&nbsp;<strong>ol&eacute;agineux&nbsp;</strong>(amandes, noix, pistaches...) en sont riches !</p>\n<p>&nbsp;</p>\n<p>Puisez dans les plats traditionnels et<strong> faites appel &agrave; votre cr&eacute;ativit&eacute;</strong> pour concocter de d&eacute;licieux repas v&eacute;g&eacute;tariens !</p>\n<p>&nbsp;</p>\n<table style=\"margin-left: auto; margin-right: auto;\">\n<tbody>\n<tr>\n<td class=\"img-container\"><img src=\"assets/img/vignettes/couscous.png\" alt=\"\" /></td>\n<td class=\"img-container\"><img src=\"assets/img/vignettes/riz-cantonais.png\" alt=\"\" /></td>\n<td class=\"img-container\"><img src=\"assets/img/vignettes/chili-sin-carne.png\" alt=\"\" /></td>\n</tr>\n<tr>\n<td class=\"label-container\"><strong>Couscous</strong> avec plus de pois chiches et l&eacute;gumes</td>\n<td class=\"label-container\"><strong>Riz cantonais</strong> g&eacute;n&eacute;reux en l&eacute;gumes</td>\n<td class=\"label-container\"><strong>Chili sin carne</strong> mariant haricots rouges, riz, tomates, oignons, poivrons, courgettes</td>\n</tr>\n</tbody>\n</table>","image":"assets/img/commitments/veg.png","logo":"assets/img/commitments/veg-icon.png","ask_for_persons":false,"ask_for_periodicity":true,"alternative_text":"","m2_saved_by_unit":"260","euros_saved_by_unit":"44.2","order":"3","active":true}],"_id":"event/1478624261077","_rev":"4-48e39f961163502be056fcd61ad8f834"}}];
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

        // create indexes
        this._db.createIndex({
          index: {
            fields: ['id_event' ]
          }
        }).then((res) => {
          console.log("index id_event creation: ", res);
        }).catch((err) => {
          console.log("index id_event creation failed: ", err);
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
