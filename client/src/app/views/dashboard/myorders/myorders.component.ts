import { Component, OnInit } from '@angular/core';

import { OrderService , AuthService } from '../../../services/index';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {
  myorders:any;
  userDetails:any;
  constructor(private orderService : OrderService,
    private authService : AuthService) { }

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
