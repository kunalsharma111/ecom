import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/guards/role.guard';
import { DashboardComponent } from './dashboard.component';

import { Roles } from '../../models/roles';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'dashbaord',
    pathMatch :  'full'
  },
  {
    path: 'dashbaord',
    component : DashboardComponent,
    // canActivate : [RoleGuard],
    data: {
      title: 'Dashbaord',
      // roles: [Roles.superAdmin,Roles.admin,Roles.careerCounselor,Roles.careerCounselor,Roles.candidate]
    }
  },
  {
    path : "**",
    redirectTo : ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
