import { Injectable } from '@angular/core';

import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpHeaderResponse} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';

//import model
import {Users} from '../model/users';
import {Contacts} from '../model/contacts';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/api/user' //api from Node-UserProfileAPI

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //error handler that return as an Observable
  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> =>{
      console.error(error);
      return of (result as T);
    };
  }

  getUsersList(): Observable<Users[]>{
    return this.http.get<Users[]>(`${apiUrl}`).pipe(
      tap(users => console.log('fetched users')),
      catchError(this.handleError('getUserList', []))
    );
  }

  getUserById(id: String): Observable<Users>{
    const url = `${apiUrl}/${id}`;
    return this.http.get<Users>(url).pipe(
      tap(_=> console.log(`fetched user id=${id}`)),
      catchError(this.handleError<Users>(`getUserById id=${id}`))
    );
  }

  addUsers(users: Users): Observable<Users>{
    const url = `${apiUrl}/signup`;
    return this.http.post<Users>(url, users, httpOptions).pipe(
      tap((u: Users)=>console.log(`Add user`)),
      catchError(this.handleError<Users>('addUser'))
    );
  }
}
