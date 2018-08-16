import {Contact} from './contact';

export class People {
  _id: string;
  name: string = '';
  contacts: Array<Contact> = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
