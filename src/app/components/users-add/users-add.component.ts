import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {

  usersForm: FormGroup;
  first_name: '';
  last_name: '';
  email: '';
  password: '';
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.usersForm = this.formBuilder.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onFormSubmit(){
    this.isLoadingResults = true;
    this.api.addUsers(this.usersForm.value).subscribe((res: any)=>{
      const id = res._id;
      console.log(id);
      this.isLoadingResults = false;
      this.router.navigate(['/users']);
    },(err: any)=>{
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
