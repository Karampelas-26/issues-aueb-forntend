import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatIcon, MatIconModule} from '@angular/material/icon';
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

import { AppRoutingModule } from './routers/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { ApplicationsComponent } from './components/technician/applications/applications.component';
import { IssuesComponent } from './components/admin/issues/issues.component';
import { StatisticsComponent } from './components/admin/statistics/statistics.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { AdminRoutingModule } from './routers/admin-routing.module';
import { NewUserComponent } from './components/admin/new-user/new-user.component';

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
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
