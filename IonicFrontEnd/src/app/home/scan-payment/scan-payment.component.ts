import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api-service.service';


@Component({
  selector: 'app-cash-out',
  templateUrl: './scan-payment.component.html',
  styleUrls: ['./scan-payment.component.scss'],
})
export class ScanPaymentComponent implements OnInit {
  
  data: any;
  jsonData: any;

  constructor(private barcodeScanner: BarcodeScanner,
    private toastController: ToastController,
    private alertPaymentMethod: AlertController,
    private apiService: ApiServiceService) { } 

  ngOnInit() {
    
  }

  scanner(){
    this.data = null;
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.data = barcodeData;
      this.jsonData = JSON.parse(this.data);
      this.paymentType(this.jsonData.receiver)
    }).catch(err => {
      console.log('Error', err);
    });
  }

  async paymentType(receiver) {
    let alertPaymentMethod = await this.alertPaymentMethod.create(
      {
        header: "Enter amount and select payment type",
        inputs:[{
          name: 'amount',
          placeholder: 'Enter anount',
          type: 'text'
        }],
        buttons:[{
          text: 'IMMEDIATE',
          handler: (alertData)=>{
            this.apiService.postPayment(alertData.amount, receiver)
            this.showSuccess()
          }
        },{
          text: 'ESCROW',
          handler: (alertData)=>{
            this.apiService.postEscrowPayment(alertData.amount, receiver)
            this.showSuccess()
          }
        }
      ]
      }
    )
    await alertPaymentMethod.present()
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
