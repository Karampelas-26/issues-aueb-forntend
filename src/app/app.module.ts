import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input'; 
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatBadgeModule} from '@angular/material/badge'; 
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {CdkTableModule} from '@angular/cdk/table';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';


import { AppRoutingModule } from './routers/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { ApplicationsComponent } from './components/technician/applications/applications.component';
import { IssuesComponent } from './components/admin/issues/issues.component';
import { StatisticsComponent } from './components/admin/statistics-panel/statistics/statistics.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { AdminRoutingModule } from './routers/admin-routing.module';
import { UsersComponent } from './components/admin/users/users.component';
import { DataTableComponent } from './components/technician/data-table/data-table.component';
import { NewUserComponent } from './components/admin/new-user/new-user.component';
import { UnauthrorizedComponent } from './components/unauthrorized/unauthrorized.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { BarChartComponent } from './components/admin/statistics-panel/bar-chart/bar-chart.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { EquipmentComponent } from './components/admin/equipment/equipment.component';
import { BuildingComponent } from './components/admin/building/building.component';
import { NewissueComponent } from './components/admin/newissue/newissue.component';
import { SemesterProgramComponent } from './components/admin/semester-program/semester-program.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TeacherComponent,
    ApplicationsComponent,
    IssuesComponent,
    StatisticsComponent,
    LoginComponent,
    UsersComponent,
    DataTableComponent,
    NewUserComponent,
    UnauthrorizedComponent,
    ForgotPasswordComponent,
    BarChartComponent,
    DashboardComponent,
    EquipmentComponent,
    BuildingComponent,
    NewissueComponent,
    SemesterProgramComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    AdminRoutingModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatBadgeModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    CdkTableModule,
    MatSortModule,
    MatListModule,
    MatChipsModule,
    MatTabsModule
    
  ],
  providers: [MatTableDataSource, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
