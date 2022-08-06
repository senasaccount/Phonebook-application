import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contactDetails: Contact = {
    id: '',
    name: '',
    phoneNumber: '',
    email: ''
  };

  constructor(private route: ActivatedRoute, private contactService: ContactsService, 
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
           this.contactService.getContact(id)
           .subscribe({
            next: (response) => {
              this.contactDetails = response;
            }
           });
      }
      }
    })
  }

  updateContact() {
    this.contactService.updateContact(this.contactDetails.id, this.contactDetails)
    .subscribe({
      next: (response) => {
        this.router.navigate(['contacts']);
      }
    })
    }

    deleteContact(id: string) {
      this.contactService.deleteContact(id)
      .subscribe({
        next: (response) => {
          this.router.navigate(['contacts']);
        }
      })
    }

}
