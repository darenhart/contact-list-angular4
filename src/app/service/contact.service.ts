import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contact } from '../model/contact';

@Injectable()
export class ContactService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private contactUrl = 'http://localhost:8000/api/contact';

  constructor(private http: Http) { }

  getContacts(): Promise<Contact[]> {
    return this.http.get(this.contactUrl)
      .toPromise()
      .then(response => {return response.json().reverse() as Contact[]})
      .catch(this.handleError);
  }

  update(contact: Contact): Promise<Contact> {
    const url = `${this.contactUrl}/${contact._id}`;
    return this.http
      .put(url, contact, {headers: this.headers})
      .toPromise()
      .then(() => contact)
      .catch(this.handleError);
  }

  delete(id: String): Promise<void> {
    const url = `${this.contactUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(contact: Contact): Promise<Contact> {
    return this.http
      .post(this.contactUrl, contact, {headers: this.headers})
      .toPromise()
      .then(res => res.json().contact as Contact)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

