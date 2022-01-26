import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/guards/role.guard';
import { DashboardComponent } from './dashboard.component';

import { Roles } from '../../models/roles';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { MyordersComponent } from './myorders/myorders.component';
import { ThanksorderComponent } from './thanksorder/thanksorder.component';

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
    path: 'cart',
    component :  ProfileComponent,
    data : {
      title : 'Cart'
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
    path: 'myorders',
    component :  MyordersComponent,
    data : {
      title : 'My Orders'
    }
  },
  {
    path: 'thanks/:id',
    component :  ThanksorderComponent,
    data : {
      title : 'Thanks'
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
