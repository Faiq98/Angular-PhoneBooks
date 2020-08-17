import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { FormBuilder, FormGroupDirective, FormGroup, Validators } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { Contacts } from '../../model/contacts';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contacts-update',
  templateUrl: './contacts-update.component.html',
  styleUrls: ['./contacts-update.component.css']
})
export class ContactsUpdateComponent implements OnInit {

  contact: Contacts = { _id: '', name: '', phone_no: '', type: '', plan: '' };

  contactsForm: FormGroup;
  _id: '';
  name: '';
  phone_no: '';
  type: '';
  plan: '';
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder, private location: Location) { }

  ngOnInit(): void {
    this.getContactById(this.route.snapshot.params.id);
    this.contactsForm = this.formBuilder.group({
      name: [null, Validators.required],
      phone_no: [null, Validators.required],
      type: [null, Validators.required],
      plan: [null, Validators.required]
    });
  }

  getContactById(id: String) {
    this.api.getContactById(id).subscribe((data: any) => {
      this.contact = data;
      this._id = data._id;
      this.contactsForm.setValue({
        name: data.name,
        phone_no: data.phone_no,
        type: data.type,
        plan: data.plan
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateContact(this._id, this.contactsForm.value).subscribe((res: any) => {
      this.location.back();
    }, (err: any) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  goBack(){
    this.location.back();
  }

}
