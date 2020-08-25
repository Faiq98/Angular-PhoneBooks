import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component';
import { UsersAddComponent } from './components/users-add/users-add.component';
import { UsersUpdateComponent } from './components/users-update/users-update.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactsAddComponent } from './components/contacts-add/contacts-add.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactsUpdateComponent } from './components/contacts-update/contacts-update.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UsersDetailsComponent,
    UsersAddComponent,
    UsersUpdateComponent,
    ContactsAddComponent,
    ContactsUpdateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
