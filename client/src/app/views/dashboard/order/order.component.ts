import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import swal from 'sweetalert2'; 

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
  orders:any;
  listOfProducts : any;
  constructor(private activateRoute : ActivatedRoute,
    private productService : ProductsService,
    private orderService : OrderService,
    private notificationService : NotificationService,
    private authService : AuthService,
    private router : Router) { }

  ngOnInit(): void {

    this.userDetails = this.authService.currentUserValue;
    this.activateRoute.queryParams.subscribe(params => {
      this.listOfProducts = JSON.parse(params.prop);
    })
    this.orders = {
      orderById : this.userDetails._id,
      orders: []
    }
    this.getAllProducts(this.listOfProducts);
  }

  getAllProducts(list: []){
    for(let i=0;i<list.length;i++){
    this.getProductDetails(list[i]);
    }
    console.log(this.orders);
    
  }

  confirmOrder(){
    this.orderService.placeOrder(this.orders).subscribe((data:any)=>{
      this.notificationService.showSuccess("",data?.message);
      // swal.fire({
      //   title: 'Thanks !',
      //   text: 'Your Order have Been Confirmed',
      //   imageUrl: this.product?.productImage,
      //   imageWidth: 400,
      //   imageHeight: 200,
      //   imageAlt: 'Product Image',
      // })      
      this.authService.changeCart(true);
      this.router.navigate(['/dashboard/thanks/'],{
        queryParams: {
          prop: JSON.stringify(data.data)
        }
      });
    })
  }

  getProductDetails(id:any){
    this.productService.getProductDetails(id).subscribe((data:any)=>{
      this.product =  data?.data;
      let dataa = {
          "orderById" : this.userDetails._id,
          "orderBy":this.userDetails.userEmail,
          "orderDate":new Date(),
          "orderPrice":this.product?.productPrice ,
          "productOrderedId":this.product?._id,
          "productName":this.product?.productName,
          "productDescription":this.product?.productDescription,
          "productImage":this.product?.productImage
      }

      this.orders.orders.push(dataa)
    })
  }

}
