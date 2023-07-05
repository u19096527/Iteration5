import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { StudentsComponent } from './students/students.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HelpTipsComponent } from './help-tips/help-tips.component';
import { AddHelptipsComponent } from './help-tips/add-helptips/add-helptips.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    VouchersComponent,
    UserRolesComponent,
    DashboardComponent,
    HelpTipsComponent,
    AddHelptipsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MatMenuModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
