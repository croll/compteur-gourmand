import docuri from 'docuri';

export class Commitment {
  _id: string
  name: string
  short_description : string
  description : string
  logo: string
  ask_for_persons: boolean
  ask_for_periodicity: boolean
  m2_saved_by_unit: number
  euros_saved_by_unit: number
  order: number
  active: boolean

  private static route = docuri.route("commitment/:name");

  put() {
    this._id = Commitment.route(this);
  }

  public static list() {

  }
}
