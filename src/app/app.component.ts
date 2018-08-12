import {Component, OnInit} from '@angular/core';
import {People} from './people';
import {Contact} from './contact';
import {PeopleService} from './people.service';
import {ContactService} from './contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PeopleService, ContactService]
})
export class AppComponent implements OnInit {

  newPerson: People = new People();
  editingPerson: People = new People();
  editingPersonOld: People = new People();
  removingContacts: Array<String> = [];

  people: People[];
  contacts: Contact[];

  constructor(private peopleService: PeopleService,
    private contactService: ContactService) {
  }

  getPeople(): void {
    let requests = [];
    requests.push(this.peopleService.getPeople()
      .then(people => {this.people = people}));
    requests.push(this.contactService.getContacts()
      .then(contacts => {this.contacts = contacts}));
    Promise.all(requests).then(() => {
      for(let person of this.people) {
        person.contacts = [];
        for(let contact of this.contacts) {
          if (contact.person_id == person._id) {
            person.contacts.push(contact);
          }
        }
      }
    });
  }

  ngOnInit(): void{
    this.getPeople();
  }

  addPerson(): void {
    this.newPerson.name = this.newPerson.name.trim();
    if (!this.newPerson.name) { return; }
    this.peopleService.create(this.newPerson)
      .then(person => {
        this.people.unshift(person);
        this.newPerson = new People();
      });
  }

  addContact(person, type): void {
    let newContact = new Contact();
    newContact.type = type;
    person.contacts.push(newContact);
  }

  updatePerson(person): void {
    this.peopleService.update(person);
    for(let contact of person.contacts) {
      if (contact._id) {
        this.contactService.update(contact);
      } else {
        contact.person_id = person._id;
        this.contactService.create(contact);
      }
    }
    for(let id of this.removingContacts) {
      this.contactService.delete(id);
    }
    this.editingPerson = new People();
  }

  cancelEdition(person): void {
    person.name = this.editingPersonOld.name;
    person.contacts = this.editingPersonOld.contacts;
    this.editingPersonOld = new People();
    this.editingPerson = new People();
    this.removingContacts = [];
  }

  deletePerson(person: People): void {
    this.peopleService.delete(person._id)
      .then(() => {
        this.people = this.people.filter(p => p !== person);
      })
    for(let contact of person.contacts) {
      this.contactService.delete(contact._id);
    }
  }

  deleteContact(contact: Contact): void {
    this.removingContacts.push(contact._id);
    for(let person of this.people) {
      if (contact.person_id == person._id) {
        person.contacts = person.contacts.filter(c => c !== contact);
      }
    }
  }

  editPerson(person: People): void {
    person.contacts = person.contacts ? person.contacts : [];
    this.editingPerson = person;
    this.editingPersonOld = new People();
    this.editingPersonOld.name = person.name + "";
    this.editingPersonOld.contacts = [];
    for(let contact of person.contacts) {
      let editingContact = new Contact();
      editingContact.type = contact.type + "";
      editingContact.value = contact.value + "";
      this.editingPersonOld.contacts.push(editingContact);
    }
  }

}
