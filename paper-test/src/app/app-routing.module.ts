import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponentComponent } from './employee-component/employee-component.component';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  { path: 'employee' , component: EmployeeComponentComponent},
  { path: 'redirect' , component: RedirectComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
