import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Users } from '../../model/users';
import { UsersListComponent } from '../users-list/users-list.component';

@Component({
  selector: 'app-contacts-add',
  templateUrl: './contacts-add.component.html',
  styleUrls: ['./contacts-add.component.css']
})
export class ContactsAddComponent implements OnInit {

  user: Users = { _id: '', first_name: '', last_name: '', email: '', contacts: [] }

  contactForm: FormGroup;
  name: '';
  phone_no: '';
  type: '';
  plan: '';
  isLoadingResults = false;

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getUserById(this.route.snapshot.params.id);
    this.contactForm = this.formBuilder.group({
      name: [null, Validators.required],
      phone_no: [null, Validators.required],
      type: [null],
      plan: [null],
    });
  }

  getUserById(id: any) {
    this.api.getUserById(id).subscribe((data: any) => {
      this.user._id = data._id;
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addContact(this.contactForm.value, this.user._id).subscribe((res: any) => {
      this.router.navigate([`/users/${this.user._id}`]);
    }, (err: any) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
