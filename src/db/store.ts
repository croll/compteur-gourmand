import { Database } from '../app/database.service';

export class Store {
  db: Database
  route: any
  startkey: string
  endkey: string

  constructor(db, route, startkey, endkey) {
    this.db=db;
    this.route=route;
    this.startkey=startkey;
    this.endkey=endkey;
  }

  list() {
    return this.db.getDb().allDocs({
      include_docs: true,
      attachments: true,
      startkey: this.startkey,
      endkey: this.endkey,
    });
  }

  put(doc: any) {
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

  remove(doc) {
    return this.db.getDb().remove(doc);
  }
}
