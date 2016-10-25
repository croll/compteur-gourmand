import docuri from 'docuri';

export class Event_Commitment {
  private static route = docuri.route("event_commitment/:id_event/:id_commitment");

  _id: string
  id_event: string
  id_commitment: string

  make_id() {
    this._id = Event_Commitment.route(this);
  }

}
