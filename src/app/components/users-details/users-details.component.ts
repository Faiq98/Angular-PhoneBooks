import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../service/api.service';
import {Users} from '../../model/users';
import { Route } from '@angular/compiler/src/core';
import { Contacts } from 'src/app/model/contacts';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {

  user: Users = {_id: '',first_name: '', last_name: '', email: '', contacts: []};
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getUsersDetails(this.route.snapshot.params.id);
  }

  getUsersDetails(id: String){
    this.api.getUserById(id).subscribe((data: any)=>{
      this.user = data;
      console.log(this.user);
      this.isLoadingResults = false;
    });
  }

}
