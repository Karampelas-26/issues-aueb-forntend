import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ApplicationsComponent } from '../components/technician/applications/applications.component';
import { AdminRoutingModule } from './admin-routing.module';
import { TeacherComponent } from '../components/teacher-comp/teacher/teacher.component';
import { AuthGuard } from '../guard/auth.guard';
import { UnauthrorizedComponent } from '../components/unauthrorized/unauthrorized.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';
import { DashboardComponent } from '../components/admin/dashboard/dashboard.component';
import { ActivateComponent } from '../components/activate/activate.component';
import {TechnicanTeamsComponent} from "../components/admin/technican-teams/technican-teams.component";

const routes: Routes = [
  {path: "", redirectTo: '/login', pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "forgotPassword", component: ForgotPasswordComponent},
  {path: "technician", component: ApplicationsComponent, canActivate: [AuthGuard], data: {expectedAuthority: 'ROLE_TECHNICIAN'}},
  {path: "teacher", component:TeacherComponent,
    children: [
      {path: 'technician-team', component: TechnicanTeamsComponent}
    ],
    canActivate: [AuthGuard], data: {expectedAuthority: 'ROLE_TEACHER'} },
  {
    path: 'admin',
    component: DashboardComponent,
    loadChildren: () => AdminRoutingModule,
    canActivate: [AuthGuard],
    data: {expectedAuthority: 'ROLE_COMMITTEE'}
  },
  {path: 'unauthorized', component: UnauthrorizedComponent},
  {path: 'activate', component: ActivateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  AdminRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
