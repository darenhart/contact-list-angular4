export class Contact {
  _id: string;
  person_id: string;
  type: string = '';
  value: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
