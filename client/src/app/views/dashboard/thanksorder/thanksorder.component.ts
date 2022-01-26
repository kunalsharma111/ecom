import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { OrderService } from '../../../services/index';

@Component({
  selector: 'app-thanksorder',
  templateUrl: './thanksorder.component.html',
  styleUrls: ['./thanksorder.component.scss']
})
export class ThanksorderComponent implements OnInit {
  orderDetails:any;
  constructor(private activateRoute : ActivatedRoute,
    private orderService : OrderService) { }

  ngOnInit(): void {
    this.getOrderDetails(this.activateRoute.snapshot.paramMap.get('id'))
  }

  getOrderDetails(id:any){
    this.orderService.getOrderDetail(id).subscribe((data:any)=>{
      this.orderDetails = data?.data;
    })
  }

}
