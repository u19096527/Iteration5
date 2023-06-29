import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelptipComponent } from './helptip/helptip.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { StudentsComponent } from './students/students.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { AddHelptipComponent } from './helptip/add-helptip/add-helptip.component';


const routes: Routes = [
  { path: 'helptip', component: HelptipComponent },
  { path: 'add-helptip', component: AddHelptipComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'vouchers', component: VouchersComponent },
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
