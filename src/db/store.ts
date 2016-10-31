import { Database } from '../app/database.service';

export abstract class Storable {
  _id: string
  _rev: string

  constructor(values = null) {
    if (values != null) {
      this.setValues(values);
    }
  }

  abstract setValues(values);

  protected copyHelper(list, values) {
    list.forEach((param) => {
        if (param in values) this[param] = values[param];
    });
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

  public static milliroute(path : string) {
    return (obj) => {
      if (('_id' in obj) && (obj._id.length > 0)) {
        return obj._id;
      } else {
        return path+(new Date().getTime());
      }
    }
  }

  create<T>(c: {new(d: any): T; }, data: any): T {
    return new c(data);
  }

  list() : Promise<any> {
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

  put(doc: T) : Promise<any> {
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

  get(id: string) : Promise<T> {
    return this.db.getDb().get(id).then((doc) => {
      return this.create(this.TCreator, doc);
    });
  }

  remove(doc: T) {
    return this.db.getDb().remove(doc);
  }
}
