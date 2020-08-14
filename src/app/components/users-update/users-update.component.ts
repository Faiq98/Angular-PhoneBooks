import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../service/api.service';
import {FormBuilder, FormGroupDirective, FormGroup, Validators} from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import {Users} from '../../model/users';

@Component({
  selector: 'app-users-update',
  templateUrl: './users-update.component.html',
  styleUrls: ['./users-update.component.css']
})
export class UsersUpdateComponent implements OnInit {

  user: Users = { _id: '', first_name: '', last_name: '', email: '', contacts: [] };

  usersForm: FormGroup;
  _id: '';
  first_name: '';
  last_name: '';
  email: '';
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getUserById(this.route.snapshot.params.id);
    this.usersForm = this.formBuilder.group({
      first_name:[null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, Validators.required]
    });
  }

  getUserById(id: any){
    this.api.getUserById(id).subscribe((data: any)=>{
      this.user = data;
      this._id = data._id;
      this.usersForm.setValue({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email
      });
    });
  }

  onFormSubmit(){
    this.isLoadingResults = true;
    this.api.updateUser(this._id, this.usersForm.value).subscribe((res: any)=>{
      this.router.navigate(['/users', this._id]);
    },(err: any)=>{
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
