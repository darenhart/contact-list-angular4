import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { People } from './people';

@Injectable()
export class PeopleService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private peopleUrl = 'http://localhost:8000/api/people';

  constructor(private http: Http) { }

  getPeople(): Promise<People[]> {
    return this.http.get(this.peopleUrl)
               .toPromise()
      .then(response => {return response.json() as People[]})
               .catch(this.handleError);
  }

  create(person: People): Promise<People> {
    return this.http
      .post(this.peopleUrl, JSON.stringify(person), {headers: this.headers})
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

        /*
  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }
         */

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

