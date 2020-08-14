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
const apiUrl = 'http://localhost:3000/api' //api from Node-UserProfileAPI

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
    return this.http.get<Users[]>(`${apiUrl}/user`).pipe(
      tap(users => console.log('fetched users')),
      catchError(this.handleError('getUserList', []))
    );
  }

  getUserById(id: String): Observable<Users>{
    const url = `${apiUrl}/user/${id}`;
    return this.http.get<Users>(url).pipe(
      tap(_=> console.log(`fetched user id=${id}`)),
      catchError(this.handleError<Users>(`getUserById id=${id}`))
    );
  }

  addUsers(users: Users): Observable<Users>{
    const url = `${apiUrl}/user/signup`;
    return this.http.post<Users>(url, users, httpOptions).pipe(
      tap((u: Users)=>console.log(`Add user`)),
      catchError(this.handleError<Users>('addUser'))
    );
  }

  addContact(contacts: Contacts, id: String): Observable<Contacts>{
    const url = `${apiUrl}/contact/${id}/create`;
    return this.http.post<Contacts>(url, contacts, httpOptions).pipe(
      tap((c: Contacts)=>console.log(`Add Contact`)),
      catchError(this.handleError<Contacts>('addUser'))
    );
  }

  updateUser(id:String, user: Users):Observable<any>{
    const url = `${apiUrl}/user/${id}/update`;
    return this.http.put(url, user, httpOptions).pipe(
      tap(_=>console.log(`update user id=${id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  deleteUser(id: String):Observable<Users>{
    const url = `${apiUrl}/user/${id}/delete`;
    return this.http.delete<Users>(url,httpOptions).pipe(
      tap(_=>console.log(`deleted user id=${id}`)),
      catchError(this.handleError<Users>('deleteUser'))
    );
  }

  deleteContact(id: String):Observable<Contacts>{
    const url = `${apiUrl}/contact/${id}/delete`;
    return this.http.delete<Contacts>(url, httpOptions).pipe(
      tap(_=>console.log(`delete contact id=${id}`)),
      catchError(this.handleError<Contacts>('deleteContact'))
    );
  }
}
