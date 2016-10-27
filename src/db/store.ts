import { Database } from '../app/database.service';

export class Storable {
  _id: string
  _rev: string

  constructor(value = null) {
    console.log("keys", Event.prototype);
    if (value != null) {
      Object.assign(this, value);
    }
  }

}

export class Store<T extends Storable> {
  TCreator: any
  db: Database
  route: any
  startkey: string
  endkey: string

  constructor(TCreator: { new (): T; }, db, route, startkey, endkey) {
    this.TCreator=TCreator;
    this.db=db;
    this.route=route;
    this.startkey=startkey;
    this.endkey=endkey;
  }

  create<T>(c: {new(d: any): T; }, data: any): T {
    return new c(data);
  }

  list() {
    return this.db.getDb().allDocs({
      include_docs: true,
      attachments: true,
      startkey: this.startkey,
      endkey: this.endkey,
    }).then((res) => {
      res.docs = [];
      res.rows.forEach((elem) => {
        res.docs.push(this.create(this.TCreator, elem.doc));
      });
      return res;
    });
  }

  put(doc: T) {
    let db = this.db.getDb();
    let old_id = doc._id;
    let new_id = this.route(doc);
    if (doc._rev && old_id && new_id && old_id != new_id) { // id is changing...
      return db.remove(doc).then((res) => {
        doc._id = new_id;
        doc._rev = undefined;
        return db.put(doc)
      });
    } else {
      doc._id = new_id;
      return db.put(doc);
    }
  }

  get(id: string) {
    return this.db.getDb().get(id);
  }

  remove(doc: T) {
    return this.db.getDb().remove(doc);
  }
}
