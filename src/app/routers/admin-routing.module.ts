import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssuesComponent } from '../components/admin/issues/issues.component';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from '../components/admin/statistics/statistics.component';
import { UsersComponent } from '../components/admin/users/users.component';


const routes: Routes = [
  {path: "issues", component: IssuesComponent},
  {path: "statistics", component: StatisticsComponent}, 
  {path: "users", component: UsersComponent} 
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
