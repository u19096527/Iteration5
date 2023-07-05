import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { HelpTipsComponent } from './help-tips/help-tips.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'help-tips',component: HelpTipsComponent },
  { path: 'user-roles', component: UserRolesComponent },
  { path: 'vouchers', component: VouchersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
