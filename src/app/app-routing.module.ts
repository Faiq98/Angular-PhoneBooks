import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component';
import { UsersAddComponent } from './components/users-add/users-add.component';
import { UsersUpdateComponent } from './components/users-update/users-update.component';
import { ContactsAddComponent } from './components/contacts-add/contacts-add.component';
import { ContactsUpdateComponent } from './components/contacts-update/contacts-update.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
    data: {title: 'List of Users'}
  },
  {
    path: 'users/:id',
    component: UsersDetailsComponent,
    data: {title: 'Details of Users'}
  },
  {
    path: 'add-user',
    component: UsersAddComponent,
    data: {title: 'Add Users'}
  },
  {
    path: 'update-user/:id',
    component: UsersUpdateComponent,
    data: {title: 'Update Users Details'}
  },
  {
    path: 'users/add-contact/:id',
    component: ContactsAddComponent,
    data: {title: 'Add user contact list'}
  },
  {
    path: 'users/update-contact/:id',
    component: ContactsUpdateComponent,
    data: {title: 'Update user contact'}
  },
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
