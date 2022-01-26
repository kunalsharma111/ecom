import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }


    placeOrder(data:any){
      return this.http.post<any>(`${environment.apiUrl}/order/create-order`,data)
            .pipe(map(user => {
                return user;
            }));
    }

    getMyOrders(id:any){
      return this.http.get<any>(`${environment.apiUrl}/order/get-orders-for-customer/${id}`)
            .pipe(map(user => {
                return user;
            }));
    }

    getOrderDetail(id:any){
      return this.http.get<any>(`${environment.apiUrl}/order//get-orders-details/${id}`)
            .pipe(map(user => {
                return user;
            }));
    }

    

    getAllOrders(){
      return this.http.get<any>(`${environment.apiUrl}/order/get-all-orders`)
            .pipe(map(user => {
                return user;
            }));
    }
}
