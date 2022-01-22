import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/guards/role.guard';
import { DashboardComponent } from './dashboard.component';

import { Roles } from '../../models/roles';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'dash',
    pathMatch :  'full'
  },
  {
    path: 'dash',
    component : DashboardComponent,
    // canActivate : [RoleGuard],
    data: {
      title: 'Dashbaord',
      // roles: [Roles.superAdmin,Roles.admin,Roles.careerCounselor,Roles.careerCounselor,Roles.candidate]
    }
  },
  {
    path: 'order/:id',
    component :  OrderComponent,
    data : {
      title : 'Order'
    }
  },
  {
    path: 'profile',
    component :  ProfileComponent,
    data : {
      title : 'Profile'
    }
  },
  {
    path: 'admin',
    component :  AdminComponent,
    data : {
      title : 'Admin'
    }
  },
  {
    path : "**",
    redirectTo : 'dash'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
