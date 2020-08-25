import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: '';
  password: '';
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onFormSubmit(){
    this.isLoadingResults = true;
    this.api.login(this.loginForm.value).subscribe((res: any)=>{
      this.isLoadingResults = false;
      console.log(res);
      localStorage.setItem('_id', res[0]._id);
      this.router.navigate(['/users', res[0]._id])
    },(err: any)=>{
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
