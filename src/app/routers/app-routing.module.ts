import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ApplicationsComponent } from '../components/technician/applications/applications.component';
import { IssuesComponent } from '../components/admin/issues/issues.component';
import { StatisticsComponent } from '../components/admin/statistics-panel/statistics/statistics.component';
import { AdminRoutingModule } from './admin-routing.module';
import { TeacherComponent } from '../components/teacher/teacher.component';
import { AuthGuard } from '../guard/auth.guard';
import { UnauthrorizedComponent } from '../components/unauthrorized/unauthrorized.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';
import { DashboardComponent } from '../components/admin/dashboard/dashboard.component';
import { UsersComponent } from '../components/admin/users/users.component';
import { NewUserComponent } from '../components/admin/new-user/new-user.component';
import { EquipmentComponent } from '../components/admin/equipment/equipment.component';
import { BuildingComponent } from '../components/admin/building/building.component';
import { NewissueComponent } from '../components/admin/newissue/newissue.component';
import { SemesterProgramComponent } from '../components/admin/semester-program/semester-program.component';

const routes: Routes = [
  {path: "", redirectTo: '/login', pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "forgotPassword", component: ForgotPasswordComponent},
  {path: "technician", component: ApplicationsComponent, canActivate: [AuthGuard], data: {expectedAuthority: 'ROLE_TECHNICIAN'}},
  {path: "teacher", component:TeacherComponent, canActivate: [AuthGuard], data: {expectedAuthority: 'ROLE_TEACHER'} },
  // {path: "admin", loadChildren: () => AdminRoutingModule, canActivate: [AuthGuard], data: {expectedAuthority: 'ROLE_ADMIN'}},
  {
    path: 'admin', 
    component: DashboardComponent, 
    children:[
      {path: 'issues', component: IssuesComponent},
      {path: 'statistics', component: StatisticsComponent}, 
      {path: 'users', component: UsersComponent},
      {path: 'newuser', component: NewUserComponent},
      {path: 'equipment', component: EquipmentComponent},
      {path: 'building', component: BuildingComponent},
      {path: 'newissue', component: NewissueComponent},
      {path: 'semester-program', component: SemesterProgramComponent},
    ],
    canActivate: [AuthGuard], 
    data: {expectedAuthority: 'ROLE_ADMIN'}
  },
  {path: 'unauthorized', component: UnauthrorizedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  AdminRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
