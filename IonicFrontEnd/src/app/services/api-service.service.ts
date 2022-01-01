import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Platform } from '@ionic/angular';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  API_URL: string;
  API_KEY: string;;
  username: string = '';
  userAccount: string = '';
  userContacts: string[] = [];
  accountBalance: string = '';
  accountAvailableBalance: string = '';

  constructor(private http: HttpClient,
    private platform: Platform) {
      this.API_URL = environment.urlLocal;
      this.API_KEY = environment.API_KEY;  
    }

  setUsernameAndAccount(username:string, account:string){this.username = username; this.userAccount = account; return true;}

  initializeFrontendWithTatumAPI_KEY(){
    return this.http.get(this.API_URL+'/initialize',{headers:{'x-api-key':String(this.API_KEY)}})
  }

  getUser(username:string) { return this.http.get(this.API_URL+`/user/`+username); }

  getContacts() { return this.http.get(this.API_URL+`/contacts/`+this.username) }

  getBalance() {
    return this.http.get(this.API_URL+`/balance/`+this.username)
  }

  getTransactions() {
    return this.http.get(this.API_URL+`/transactions/`+this.username);
  }

  postTopUp(topUpAmount: string) {
    let body = { "amount": topUpAmount };
    return this.http.post(this.API_URL+`/top-up/`+this.username, body);
  }

  postPayment(payAmount: string, receiver: string, username:string) {
    let body = {
      "amount": payAmount,
      "receiver": receiver,
      "username": username,
      "type": "NORMAL"
    }
    return this.http.post(this.API_URL+`/payment/`+this.username, body);
  }

  postEscrowPayment(payAmount: string, receiver: string, username:string) {
    let body = {
      "amount": payAmount,
      "receiver": receiver,
      "username": username,
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
