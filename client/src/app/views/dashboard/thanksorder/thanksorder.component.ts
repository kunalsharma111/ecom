import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { OrderService } from '../../../services/index';

@Component({
  selector: 'app-thanksorder',
  templateUrl: './thanksorder.component.html',
  styleUrls: ['./thanksorder.component.scss']
})
export class ThanksorderComponent implements OnInit {
  orderDetailss:any=[];
  or:any;
  allOrders:any;
  constructor(private activateRoute : ActivatedRoute,
    private orderService : OrderService) { }

  ngOnInit(): void {
    this.allOrders = [];
    this.showOrderDetails = false;
    this.activateRoute.queryParams.subscribe(params => {
      this.orderDetailss = JSON.parse(params.prop);
    })
    
    this.getAllProducts(this.orderDetailss);
  }

  showOrderDetails = false;
  getAllProducts(orders: []){
  for(let i=0;i<orders.length;i++){
    this.getOrderDetails(orders[i]);
    if(i == (orders.length - 1)){
      this.showOrderDetails = true;
    }
  }
      
  }
  getOrderDetails(id:any){
    this.orderService.getOrderDetail(id).subscribe((data:any)=>{
      this.or = data?.data;
      this.allOrders.push(this.or);
    })
  }

  public openPDF():void {
    let DATA :any= document.getElementById('htmlData');
        
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth / canvas.width)-30;
        
        const FILEURI = canvas.toDataURL("image/jpeg", 1.0);
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

        PDF.save('orders.pdf');
    });     
    }

}
