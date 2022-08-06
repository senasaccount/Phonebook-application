import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  addContactRequest: Contact = {
    id: '',
    name: '',
    phoneNumber: '',
    email: ''
  };
  
  constructor(private contactService: ContactsService, private router: Router) { }

  ngOnInit(): void {
  }

  addContact() {
    this.contactService.addContact(this.addContactRequest)
    .subscribe({
      next: (contact) => {
        this.router.navigate(['contacts']);
      }
    });
  }

}
