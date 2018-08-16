import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { People } from '../model/people';

@Injectable()
export class PeopleService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private peopleUrl = 'http://localhost:8000/api/people';

  constructor(private http: Http) { }

  getPeople(): Promise<People[]> {
    return this.http.get(this.peopleUrl)
      .toPromise()
      .then(response => {return response.json().reverse() as People[]})
      .catch(this.handleError);
  }

  create(person: People): Promise<People> {
    return this.http
      .post(this.peopleUrl, person, {headers: this.headers})
      .toPromise()
      .then(res => res.json().person as People)
      .catch(this.handleError);
  }

  delete(id: String): Promise<void> {
    const url = `${this.peopleUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(person: People): Promise<People> {
    const url = `${this.peopleUrl}/${person._id}`;
    return this.http
      .put(url, person, {headers: this.headers})
      .toPromise()
      .then(() => person)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

