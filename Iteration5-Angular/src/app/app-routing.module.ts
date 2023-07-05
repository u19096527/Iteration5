import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { HelpTipsComponent } from './help-tips/help-tips.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'user-roles', component: UserRolesComponent },
  { path: 'vouchers', component: VouchersComponent },
  { path: 'help-tips', component: HelpTipsComponent },

];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
