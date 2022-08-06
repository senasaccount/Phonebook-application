import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts: Contact[] = [];
  constructor(private contactService: ContactsService) { }

  ngOnInit(): void {
    this.contactService.getAllContacts()
    .subscribe({
      next: (contacts) => {
        this.contacts = contacts;},
      error: (response) => {
        console.log(response);
      }})       
      }
    }