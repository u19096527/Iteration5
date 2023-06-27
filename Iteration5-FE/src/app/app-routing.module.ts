import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelptipComponent } from './helptip/helptip.component';

const routes: Routes = [
  { path: '', redirectTo: '/helptip', pathMatch: 'full' }, // Default route
  { path: '/helptip', component: HelptipComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
