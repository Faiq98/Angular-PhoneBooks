import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../service/api.service';
import { Users } from '../../model/users';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  data: Users[] = [];
  isLoadingResults = true;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.api.getUsersList().subscribe((res: any) => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err =>{
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  deleteUser(id: any){
    this.api.deleteUser(id).subscribe(res=>{
      this.router.navigate(['/users']);
      this.ngOnInit();
    },(err)=>{
      console.log(err);
    });
  }
}
