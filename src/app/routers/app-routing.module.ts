import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ApplicationsComponent } from '../components/technician/applications/applications.component';
import { IssuesComponent } from '../components/admin/issues/issues.component';
import { StatisticsComponent } from '../components/admin/statistics/statistics.component';
import { AdminRoutingModule } from './admin-routing.module';
import { TeacherComponent } from '../components/teacher/teacher.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "technician", component: ApplicationsComponent},
  {path: "teacher", component:TeacherComponent },
  {path: "admin", loadChildren: () => AdminRoutingModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  AdminRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
