import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api-service.service';


@Component({
  selector: 'app-cash-out',
  templateUrl: './scan-payment.component.html',
  styleUrls: ['./scan-payment.component.scss'],
})
export class ScanPaymentComponent implements OnInit {
  
  data: any;
  jsonData: any;
  amount: string;

  constructor(private barcodeScanner: BarcodeScanner,
    private toastController: ToastController,
    private alertPaymentMethod: AlertController,
    private apiService: ApiServiceService,
    private loadingController: LoadingController) { } 

  ngOnInit() {
    
  }

  scanner(){
    this.data = null;
    this.barcodeScanner.scan().then(barcodeData => {
      // console.log('Barcode data', barcodeData);
      this.data = barcodeData;
      this.jsonData = JSON.parse(this.data);
      this.paymentType(this.jsonData.receiver)
    }).catch(err => {
      // console.log('Error', err);
    });
  }

  async paymentType(receiver) {
    let alertPaymentMethod = await this.alertPaymentMethod.create(
      {
        header: "Please select payment type",
        buttons:[{
          text: 'IMMEDIATE',
          handler: ()=>{
            this.showProgressSpinner();
            this.apiService.postPayment(this.amount, receiver).subscribe(data => {
              console.log(data)
              this.loadingController.dismiss()
              this.showSuccess()
            });
          }
        },{
          text: 'ESCROW',
          handler: ()=>{
            this.showProgressSpinner()
            this.apiService.postEscrowPayment(this.amount, receiver).subscribe(data => {
              console.log(data);
              this.loadingController.dismiss()
              this.showSuccess()
            });
          }
        }
      ]
      }
    )
    await alertPaymentMethod.present()
  }

  async showProgressSpinner(){
    const loading = await this.loadingController.create({
      spinner: "bubbles",
      message: 'Loading account, please wait',
      translucent: false,
      backdropDismiss: false
    });
    await loading.present()
  }

  async showSuccess(){
    let toast = await this.toastController.create(
      {
        header: "Success!",
        message: "Payment completed!"
      }
    )
    await toast.present()
  }

}
