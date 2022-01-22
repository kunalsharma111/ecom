import { Component, OnInit } from '@angular/core';

import { AuthService,OrderService } from '../../../services/index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userDetails:any;
  myorders : any;
  constructor(private authService :  AuthService,
    private orderService : OrderService) { }

  ngOnInit(): void {
    this.userDetails = this.authService.currentUserValue;
    this.getMyOrders(this.userDetails._id);
  }

  getMyOrders(id:any){
    this.orderService.getMyOrders(id).subscribe((data:any)=>{
      this.myorders = data?.data;
    })
  }
}
