import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssuesComponent } from '../components/admin/issues/issues.component';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from '../components/admin/statistics/statistics.component';
import { UsersComponent } from '../components/admin/users/users.component';
import { NewUserComponent } from '../components/admin/new-user/new-user.component';


const routes: Routes = [
  {path: 'issues', component: IssuesComponent},
  {path: 'statistics', component: StatisticsComponent}, 
  {path: 'users', component: UsersComponent},
  {path: 'newuser', component: NewUserComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
