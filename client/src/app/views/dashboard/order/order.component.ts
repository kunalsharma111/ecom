import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { ProductsService, OrderService, NotificationService, AuthService } from '../../../services/index';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  product:any;
  data:any;
  userDetails:any;
  constructor(private activateRoute : ActivatedRoute,
    private productService : ProductsService,
    private orderService : OrderService,
    private notificationService : NotificationService,
    private authService : AuthService,
    private router : Router) { }

  ngOnInit(): void {
    this.getProductDetails(this.activateRoute.snapshot.paramMap.get('id'))
  }

  confirmOrder(){
    this.orderService.placeOrder(this.data).subscribe((data:any)=>{
      this.notificationService.showSuccess("",data?.message);
      this.router.navigate(['/dashboard/']);
    })
  }

  getProductDetails(id:any){
    
    this.userDetails = this.authService.currentUserValue;
    this.productService.getProductDetails(id).subscribe((data:any)=>{
      this.product =  data?.data;
      this.data = {
        "orderById":this.userDetails._id,
        "orderBy":this.userDetails.userEmail,
        "orderDate":new Date(),
        "orderPrice":this.product?.productPrice ,
        "productOrderedId":this.product?._id,
        "productName":this.product?.productName,
        "productDescription":this.product?.productDescription,
        "productImage":this.product?.productImage       
      }
    })
  }

}
