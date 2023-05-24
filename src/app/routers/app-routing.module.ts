import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ApplicationsComponent } from '../components/technician/applications/applications.component';
import { IssuesComponent } from '../components/admin/issues/issues.component';
import { StatisticsComponent } from '../components/admin/statistics/statistics.component';
import { AdminRoutingModule } from './admin-routing.module';
import { TeacherComponent } from '../components/teacher/teacher.component';
import { AuthGuard } from '../guard/auth.guard';
import { UnauthrorizedComponent } from '../components/unauthrorized/unauthrorized.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "technician", component: ApplicationsComponent, canActivate: [AuthGuard], data: {expectedAuthority: 'ROLE_TECHNICIAN'}},
  {path: "teacher", component:TeacherComponent, canActivate: [AuthGuard], data: {expectedAuthority: 'ROLE_TEACHER'} },
  {path: "admin", loadChildren: () => AdminRoutingModule, canActivate: [AuthGuard], data: {expectedAuthority: 'ROLE_ADMIN'}},
  {path: 'unauthorized', component: UnauthrorizedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  AdminRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
