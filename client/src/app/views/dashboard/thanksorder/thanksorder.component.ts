import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { OrderService } from '../../../services/index';

@Component({
  selector: 'app-thanksorder',
  templateUrl: './thanksorder.component.html',
  styleUrls: ['./thanksorder.component.scss']
})
export class ThanksorderComponent implements OnInit {
  orderDetailss:any;
  allOrders:any;
  constructor(private activateRoute : ActivatedRoute,
    private orderService : OrderService) { }

  ngOnInit(): void {
    this.allOrders = [];
    this.activateRoute.queryParams.subscribe(params => {
      this.orderDetailss = JSON.parse(params.prop);
      console.log(this.orderDetailss);
      
    })
    this.getAllProducts(this.orderDetailss);
  }

  getAllProducts(orders: []){
  for(let i=0;i<orders.length;i++){
    this.getOrderDetails(orders[i]);
  }
      
  }
  getOrderDetails(id:any){
    this.orderService.getOrderDetail(id).subscribe((data:any)=>{
      this.orderDetailss = data?.data;
      this.allOrders.push(this.orderDetailss);
    })
  }

}
