import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import swal from 'sweetalert2'; 
import { NgxSpinnerService } from "ngx-spinner";
import { ProductsService, OrderService, NotificationService, AuthService } from '../../../services/index';

import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

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
  date:any;

  name:any;
  email:any;
  country:any="";
  coupon:any;

  countries : any = [];

  constructor(private activateRoute : ActivatedRoute,
    private productService : ProductsService,
    private orderService : OrderService,
    private notificationService : NotificationService,
    private authService : AuthService,
    private spinner: NgxSpinnerService,
    private router : Router) { }

  ngOnInit(): void {
    this.showCouponError = false;
    this.showCouponApplied = false;
    this.date = new Date();
    this.userDetails = this.authService.currentUserValue;
    this.name = this.userDetails.userName;
    this.email = this.userDetails.userEmail;
    this.activateRoute.queryParams.subscribe(params => {
      this.listOfProducts = JSON.parse(params.prop);
    })
    this.orders = {
      orders: []
    }
    this.getAllProducts(this.listOfProducts);
    this.getAllCountries();
  }

  getAllCountries(){
    this.orderService.getAllCountry().subscribe((data:any)=>{
      for(let i=0;i<data.length;i++){
        this.countries.push(data[i].name?.common);
      }
    })
  }

  getAllProducts(list: []){
    for(let i=0;i<list.length;i++){
    this.getProductDetails(list[i]);
    }
  }

  confirmOrder(){
    if(this.email == "" || this.country == undefined || this.country == ""){
      this.notificationService.showError("","Please Enter Full Shipping Information");
      return
    }
    let finalOrders = [];
    for(let i=0;i<this.orders?.orders.length;i++){
      finalOrders.push({
        country:this.country,
        productOrderedId:this.orders.orders[i].productOrderedId
      })
    }
    let or = {
      orders : finalOrders
    }
    this.orderService.placeOrder(or).subscribe((data:any)=>{
      this.notificationService.showSuccess("",data?.message);
      this.authService.changeCart(true);
      this.router.navigate(['/dashboard/thanks/'],{
        queryParams: {
          prop: JSON.stringify(data.orders)
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

  showCouponError : Boolean = false;
  showCouponApplied : Boolean = false;
  applyCoupon(){
    this.showCouponError = false;
    this.showCouponApplied = false;
    this.spinner.show();
    if(this.coupon == undefined || this.coupon == ""){
      this.notificationService.showError("","Please Enter Coupon");
      this.spinner.hide();
      return;
    }
    setTimeout(() => {
      if(this.coupon == "rahulshettyacademy"){
        this.spinner.hide();
        this.showCouponApplied = true;
        // this.notificationService.showSuccess("","Coupon Applied"); 
      }else{
        this.spinner.hide();
        this.showCouponError = true;
        // this.notificationService.showError("","Invalid Coupon");
      }
  }, 3000);
    
  }

  selectedStatic(result:any) {
    this.country = result;
  }

}
