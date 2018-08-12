import {Component, OnInit} from '@angular/core';
import {Todo} from './todo';
import {People} from './people';
import {PeopleService} from './people.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PeopleService]
})
export class AppComponent implements OnInit {

  newPerson: People = new People();

  people: People[];

  constructor(private peopleService: PeopleService) {
  }

  getPeople(): void {
    this.peopleService.getPeople()
      .then(people => {this.people = people});
  }

  ngOnInit(): void{
    this.getPeople();
  }

  addPerson(): void {
    this.newPerson.name = this.newPerson.name.trim();
    if (!this.newPerson.name) { return; }
    this.peopleService.create(this.newPerson)
      .then(person => {
        this.people.push(person);
        this.newPerson = new People();
      });
  }

  deletePerson(person: People): void {
    this.peopleService.delete(person._id)
      .then(() => {
        this.people = this.people.filter(p => p !== person);
      })
  }

  addTodo() {
  }

  toggleTodoComplete(todo) {
  }

  removeTodo(todo) {
  }

}
