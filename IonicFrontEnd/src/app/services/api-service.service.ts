import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  API_URL = environment.url;

  username: string = '';
  userAccount: string = '';
  userContacts: string[] = [];
  accountBalance: string = '';
  accountAvailableBalance: string = '';

  constructor(private http: HttpClient) { }

  setUsername(username:string) { this.username = username; this.getUser()}

  getUser() {
    let response;
    return this.http.get(this.API_URL+`/user/`+this.username).subscribe(data => {
      response = data;
      console.log(response);
    });
  }

  getContacts() {
    let response;
    this.http.get(this.API_URL+`/contacts/`+this.username).subscribe(data => {
      response = data
      console.log(response)
    });
  }

  getBalance() {
    return this.http.get(this.API_URL+`/balance/`+this.username)
  }

  getTransactions() {
    return this.http.get(this.API_URL+`/transactions/`+this.username);
  }

  postTopUp(topUpAmount: string) {
    let response;
    let body = {
      "amount": topUpAmount
    }
    return this.http.post(this.API_URL+`/top-up/`+this.username, body);
  }

  postPayment(payAmount: string, receiver: string) {
    let response;
    let body = {
      "amount": payAmount,
      "receiver": receiver,
      "type": "NORMAL"
    }
    return this.http.post(this.API_URL+`/payment/`+this.username, body).subscribe(data => {
      response = data
      console.log(response)
    });
  }

  postEscrowPayment(payAmount: string, receiver: string) {
    let response;
    let body = {
      "amount": payAmount,
      "receiver": receiver,
      "type": "ESCROW"
    }
    return this.http.post(this.API_URL+`/escrow-pay/`+this.username, body).subscribe(data => {
      response = data
      console.log(response)
    });
  }

  postEscrowClear(receiverId: string) {
    let response;
    let body = {
      "receiver": receiverId,
    }
    return this.http.post(this.API_URL+`/escrow-clear/`+this.username, body).subscribe(data => {
      response = data
      console.log(response)
    });
  }

}
