import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { HelpTipsComponent } from './help-tips/help-tips.component';
import { AddHelptipsComponent } from './help-tips/add-helptips/add-helptips.component';
import { EditHelptipComponent } from './help-tips/edit-helptip/edit-helptip.component';
import { ViewHelptipComponent } from './help-tips/view-helptip/view-helptip.component';
import { EditUserroleComponent } from './user-roles/edit-userrole/edit-userrole.component';
import { AddUserroleComponent } from './user-roles/add-userrole/add-userrole.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'user-roles', component: UserRolesComponent },
  { path: 'vouchers', component: VouchersComponent },
  { path: 'help-tips', component: HelpTipsComponent },
  { path: 'add-helptips', component: AddHelptipsComponent },
  { path: 'edit-helptip/:id', component: EditHelptipComponent },
  { path: 'view-helptip/:id', component: ViewHelptipComponent },
  { path: 'add-userrole', component: AddUserroleComponent },
  { path: 'edit-userrole/:id', component: EditUserroleComponent },

];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
