import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  API_URL: string;
  username: string = '';
  userAccount: string = '';
  userContacts: string[] = [];
  accountBalance: string = '';
  accountAvailableBalance: string = '';

  constructor(private http: HttpClient,
    private platform: Platform) {
      console.log(platform.platforms())
      if(platform.is("android")){
        this.API_URL = environment.urlDeployed;
      } else {
        this.API_URL = environment.urlLocal;
      }
    }

  setUsernameAndAccount(username:string, account:string){this.username = username; this.userAccount = account; return true;}

  getUser(username:string) { return this.http.get(this.API_URL+`/user/`+username); }

  getContacts() {
    let response;
    this.http.get(this.API_URL+`/contacts/`+this.username).subscribe(data => {
      response = data
      // console.log(response)
    });
  }

  getBalance() {
    return this.http.get(this.API_URL+`/balance/`+this.username)
  }

  getTransactions() {
    return this.http.get(this.API_URL+`/transactions/`+this.username);
  }

  postTopUp(topUpAmount: string) {
    let body = { "amount": topUpAmount }
    return this.http.post(this.API_URL+`/top-up/`+this.username, body);
  }

  postPayment(payAmount: string, receiver: string) {
    let body = {
      "amount": payAmount,
      "receiver": receiver,
      "type": "NORMAL"
    }
    return this.http.post(this.API_URL+`/payment/`+this.username, body);
  }

  postEscrowPayment(payAmount: string, receiver: string) {
    let body = {
      "amount": payAmount,
      "receiver": receiver,
      "type": "ESCROW"
    }
    return this.http.post(this.API_URL+`/escrow-pay/`+this.username, body)
  }

  postEscrowClear(receiverId: string) {
    let body = {
      "receiver": receiverId,
    }
    return this.http.post(this.API_URL+`/escrow-clear/`+this.username, body);
  }

}
