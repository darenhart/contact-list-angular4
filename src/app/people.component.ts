import {Component, OnInit} from '@angular/core';
import {People} from './model/people';
import {Contact} from './model/contact';
import {PeopleService} from './service/people.service';
import {ContactService} from './service/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './view/people.component.html',
  styleUrls: ['./scss/people.component.scss'],
  providers: [PeopleService, ContactService]
})
export class PeopleComponent implements OnInit {

  searchText: string = '';
  loading: boolean = false;
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
    this.loading = true;
    this.peopleService.create(this.newPerson)
      .then(person => {
        this.loading = false;
        this.people.unshift(person);
        this.newPerson = new People();
        this.editPerson(person);
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
        if (contact.value) {
          this.contactService.create(contact).then((c) => {
            contact._id = c._id;
          });
        }
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
    if (person.contacts) {
      for(let contact of person.contacts) {
        this.contactService.delete(contact._id);
      }
    }
  }

  deleteContact(contact: Contact): void {
    this.removingContacts.push(contact._id);
    for(let person of this.people) {
      if (contact.person_id == person._id || !contact._id) {
        person.contacts = person.contacts.filter(c => c !== contact);
      }
    }
  }

  editPerson(person: People): void {
    person.contacts = person.contacts ? person.contacts : [];
    this.editingPerson = person;
    this.editingPersonOld = Object.assign({}, person);
    this.editingPersonOld.contacts = [];
    person.contacts.map((contact) => {
      this.editingPersonOld.contacts.push(Object.assign({}, contact));
    });
  }

}
