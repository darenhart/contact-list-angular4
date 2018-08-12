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

  newTodo: Todo = new Todo();

  people: People[];

  constructor(private peopleService: PeopleService) {
  }

  getPeople(): void {
    this.peopleService.getPeople()
      .then(people => {this.people = people});
  }

  ngOnInit(): void{
    this.getPeople();
    console.log('on init teste'); 
  }

  addTodo() {
  }

  toggleTodoComplete(todo) {
  }

  removeTodo(todo) {
  }

}
