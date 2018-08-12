export class People {
  _id: string;
  name: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
