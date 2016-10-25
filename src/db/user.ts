import docuri from 'docuri';

export class User {
  private static route = docuri.route("user/:lastname|:firstname");

  _id: string
  firstname: string
  lastname: string
  email: string
  phone: string
  city: string
  photo: string

  make_id() {
    this._id = User.route(this);
  }

}
