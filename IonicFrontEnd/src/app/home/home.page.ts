import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { HomePageCards } from '../models/home-cards.models';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{
  
  cardRows = HomePageCards;
  userAccount : string = '';
  balanceData: any;
  balance: any;
  available: any;
  transactionCards = []
  transactions: any;
  username: string = ''

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private apiService: ApiServiceService,
    public loadingController: LoadingController
  ) {}
  
  ngOnInit(): void {
    console.log("home init");
    this.username = this.apiService.username;
    this.getBalAndTransactions();
  }

  async cashInCashOut(id:string){
    switch(id){
      case "cashin":
        let alertController = await this.alertController.create({
          header: "Voucher",
          message: "Please enter voucher number ",
          inputs:[{
            name: 'voucherNumber',
            type: 'text',
            placeholder: 'Voucher number'
          }],
          buttons: [
            {
              text: 'CONFIRM',
              handler: () => {
                this.showProgressSpinner();
                this.apiService.postTopUp("500").subscribe(data =>{
                  this.getBalAndTransactions();
                });

              }
            },
          ]
        });
        await alertController.present();
        break;
      case "cashout":
        let alertControllerSecond = await this.alertController.create({
          header: "Scan QR",
          message: "Please scan the agents QR Code.",
          buttons: [
            {
              text: 'Proceed',
              handler: () => {
                this.displayModal(HomePageCards[0])
              }
            },
          ]
        });
        await alertControllerSecond.present();
        break;
    }
  }

  async displayModal(row:any){
    const account = await this.modalController.create(
      {
        component: row.component,
        showBackdrop: true,
        cssClass: "my-custom-modal-css",
        backdropDismiss: true,
        swipeToClose: true
      }
    );

    account.onDidDismiss().then(()=>{
      this.getBalAndTransactions();
      }
    )

    return await account.present()
  }

  async showProgressSpinner(){
    const loading = await this.loadingController.create({
      spinner: "bubbles",
      // duration: 5000,
      message: 'Loading account, please wait',
      translucent: false,
      backdropDismiss: false
    });
    await loading.present()
  }

  async approve(){
    let approve = await this.alertController.create({
      header: "Approve Escrow Payment?",
      message: "Please confirm payment sshould be released to receiver",
      buttons:[{
        text: "Confirm",
        handler: ()=>{
          this.apiService.postEscrowClear('block_id')
        }
      }, "Cancel"]
    });
    await approve.present();
  }

  getTransactions() {
    let transactions = this.apiService.getTransactions().subscribe(data =>{
      this.transactionCards = data['transactions'];
      console.log(transactions);
    });
  }

  updateBalance() {
    this.balanceData = this.apiService.getBalance().subscribe(data =>{
      console.log(data)
      this.balance = data['balance'].accountBalance;
      this.available = data['balance'].availableBalance;
    });
  }

  getBalAndTransactions() {
    this.updateBalance();
    while(true){
      if (this.balance){
        break;
      }
    }
    this.getTransactions();
  }

}