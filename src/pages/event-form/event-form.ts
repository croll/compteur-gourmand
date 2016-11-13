import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
//import { Database } from '../../app/database.service';
import { StoredConfiguration, Configuration } from '../../db/configuration';
import { StoredEvent, Event } from '../../db/event';
import { StoredContribution } from '../../db/contribution'; // for csv export
import { AlertController } from 'ionic-angular';
//import { File } from 'ionic-native';

/*
  Generated class for the EventForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-form',
  templateUrl: 'event-form.html'
})
export class EventFormPage {
  configuration: Configuration;
  form: FormGroup;
  id: string;
  loadedDoc: Event;
  wasActive = false;

  constructor(public navCtrl: NavController, private navParams: NavParams, private formBuilder: FormBuilder, private store: StoredEvent, private store_config: StoredConfiguration, private alertCtrl: AlertController, private storedContribution: StoredContribution) {
    this.id = navParams.get('id') || null;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      active: [false],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required]
    });

/*
    console.log("HACK window['cordova'].file.externalRootDirectory : " +window['cordova'].file.externalRootDirectory);

    window['requestFileSystem'](window['PERSISTENT'], 0, (fs) => {
        fs.root.getDirectory(window['cordova'].file.externalRootDirectory+'/Download', {
            create : true,
            exclusive : false
        }, function (dirEntry) { //success
          console.log("dirEntry: "+JSON.stringify(dirEntry));
            //do here what you need to do with Download folder
        }, function (err) {
          console.log("dirEntry err: "+JSON.stringify(err));
            //error getDirectory
        });
    }, (err) => {
      console.log("err request file system");
    }
  );
*/


  }

  ionViewDidLoad() {
    this.store_config.get("configuration/main").then((configuration) => {
      this.configuration = configuration;
    }).catch((err) => {
        alert("immpossible de charger la configuration general: "+err);
    });

    if (this.id) {
      this.load(this.id);
    } else {
      this.loadedDoc = new Event();
    }
  }

  load(id: string) {
    return this.store.get(id).then((doc) => {
      this.loadedDoc = doc;
      this.id = this.loadedDoc._id;
      this.wasActive = this.configuration.id_active_event == doc._id;
      let e = {
        name: doc.name,
        description: doc.description,
        start_date: doc.start_date,
        end_date: doc.end_date,
        active: this.wasActive,
      };
      this.form.setValue(e);
    });
  }

  save() {
    let values = this.form.getRawValue();
    this.loadedDoc.setValues(values);
    this.store.put(this.loadedDoc).then((res) => {

      // update active event in configuration object
      if (this.wasActive && values['active'] == false) {
        this.configuration.id_active_event = null;
      } else if (values['active'] == true) {
        this.configuration.id_active_event = res.id;
      }

      return this.store_config.put(this.configuration).then((res) => {
        this.navCtrl.pop();
      }).catch((err) => {
        alert("Impossible de sauver l'evenement actif : "+err);
      });
    }).catch((err) => {
      console.log("event puted failed: ", err);
      alert("Impossible de sauver : "+err);
    });
  }

  remove() {
    this.store.remove(this.loadedDoc).then((res) => {
      this.id=undefined;
      this.loadedDoc=undefined;
      this.navCtrl.pop();
    }).catch((err)=>{
      alert("Impossible de supprmier : "+err);
    })
  }

  showRemoveConfirm(event) {
    event.preventDefault();
    event.stopPropagation();
    let self=this;

    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Voulez vous vraiment supprimer cet évènement ?',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            self.remove();
          }
        }
      ]
    });
    confirm.present();
  }

  export_csv(event) {
    event.preventDefault();
    event.stopPropagation();

    /* ionic-native sux
    this.storedContribution.getEventContributionsCSV(this.loadedDoc).then((csv) => {
      let filename = this.loadedDoc.name+"-"+new Date().toDateString()+".csv";
      //let filename = "test.csv";
      console.log("saving file ... "+filename);
      let dataObj = new Blob([csv], { type: 'text/plain' });
      return File.writeFile("/sdcard/Download/",
        this.loadedDoc.name+"-"+new Date().toDateString()+".csv",
        dataObj, {}).then(() => {
          alert("Le fichier "+filename+" à été créé.");
      }, (err) => {
        console.error("write file failed : "+JSON.stringify(err));
        alert("CSV Save Failed: "+JSON.stringify(err));
      });
    }).catch((err) => {
      alert("CSV Download Failed: "+err);
      console.error("CSV Download failed err : ", err);
      console.error(JSON.stringify(err));
    });
    */

    /* version cordova
    this.storedContribution.getEventContributionsCSV(this.loadedDoc).then((csv) => {
      let filename = this.loadedDoc.name+"-"+new Date().toDateString()+".csv";
      //let filename = "test.csv";
      console.log("saving file ... "+filename);
      window['requestFileSystem'](window['PERSISTENT'], 0, (fs) => {
        console.log('file system open: ' + fs.name);
        fs.root.getDirectory(this.path_download, { create: true }, (dirEntry) => {
          console.log("dirEntry: ", JSON.stringify(dirEntry));
        });
        console.log('file system: ' + JSON.stringify(fs));

        fs.root.getFile(this.path_download+'/'+filename, { create: true, exclusive: false }, (fileEntry) => {
          console.log("fileEntry is file?" + fileEntry.isFile.toString());
          console.log('fileentry: '+JSON.stringify(fileEntry));
          // fileEntry.name == 'someFile.txt'
          // fileEntry.fullPath == '/someFile.txt'

          fileEntry.createWriter((fileWriter) => {

              fileWriter.onwriteend = () => {
                alert("Le fichier "+filename+" à été créé.");
              };

              fileWriter.onerror = (e) => {
                  console.log("Failed file write: " + e.toString());
              };

              let dataObj = new Blob([csv], { type: 'text/plain' });

              fileWriter.write(dataObj);
          });

        }, (err) => {
          alert("creation du fichier raté : "+JSON.stringify(err));
        });
      }, (err) => {
        alert("requestFileSystem : "+JSON.stringify(err));
      });
    }).catch((err) => {
      alert("CSV Download Failed: "+err);
      console.error("CSV Download failed err : ", err);
      console.error(JSON.stringify(err));
    });
    */

    // version ca commence a me gonfler
    this.storedContribution.getEventContributionsCSV(this.loadedDoc).then((csv) => {
      let filename = this.loadedDoc.name+"-"+new Date().toDateString()+".csv";
      this.writeToFile(filename, csv);
    });
  }


  writeToFile(fileName, data) {
    window['resolveLocalFileSystemURL'](window['cordova'].file.externalRootDirectory, (directoryEntry) => {
        directoryEntry.getFile(fileName, { create: true }, (fileEntry) => {
            fileEntry.createWriter((fileWriter) => {
                fileWriter.onwriteend = (e) => {
                    // for real-world usage, you might consider passing a success callback
                    console.log('Write of file "' + fileName + '"" completed.');
                    alert("Le fichier '"+fileName+"' à été généré.");
                };

                fileWriter.onerror = (e) => {
                    // you could hook this up with our global error handler, or pass in an error callback
                    console.log('Write failed: ' + e.toString());
                    alert("Impossible d'écrire le fichier (4) : "+JSON.stringify(e));
                };

                var blob = new Blob([data], { type: 'text/plain' });
                fileWriter.write(blob);
            }, (err) => {
              alert("Impossible d'écrire le fichier (3) : "+JSON.stringify(err));
            });
        }, (err) => {
          alert("Impossible d'écrire le fichier (2) : "+JSON.stringify(err));
        });
    }, (err) => {
      alert("Impossible d'écrire le fichier (1) : "+JSON.stringify(err));
    });
  }


}
