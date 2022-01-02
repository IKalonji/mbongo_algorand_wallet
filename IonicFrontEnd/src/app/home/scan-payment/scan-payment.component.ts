import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api-service.service';


@Component({
  selector: 'app-cash-out',
  templateUrl: './scan-payment.component.html',
  styleUrls: ['./scan-payment.component.scss'],
})
export class ScanPaymentComponent implements OnInit {
  
  data: string = '';
  jsonData: any;
  amount: string;

  constructor(private barcodeScanner: BarcodeScanner,
    private toastController: ToastController,
    private alertController: AlertController,
    private apiService: ApiServiceService,
    private loadingController: LoadingController,
    private modalController: ModalController) { } 

  ngOnInit() {
    
  }

  scanner(){
    // this.data = null;
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a QR Code inside the scan area',
      resultDisplayDuration: 1000,
      formats: 'QR_CODE',
      orientation: 'portrait',
    };
    this.barcodeScanner.scan(options).then(barcodeData => {
      // console.log('Barcode data', barcodeData);
      this.data = barcodeData.text;
      this.jsonData = JSON.parse(this.data);
      this.paymentType(this.jsonData.receiver, this.jsonData.username)
      this.modalController.dismiss()
    }).catch(err => {
      console.log('Error', err);
      this.showError(err);
    });
  }

  async paymentType(receiver:string,username:string ) {
    let alertPaymentMethod = await this.alertController.create(
      {
        header: "Please select payment type",
        buttons:[{
          text: 'IMMEDIATE',
          handler: ()=>{
            this.showProgressSpinner();
            this.apiService.postPayment(this.amount, receiver, username).subscribe(data => {
              console.log(data)
              this.loadingController.dismiss()
              this.showSuccess()
            });
          }
        },{
          text: 'ESCROW',
          handler: ()=>{
            this.showProgressSpinner()
            this.apiService.postEscrowPayment(this.amount, receiver, username).subscribe(data => {
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
        message: "Payment completed!",
        duration: 3000
      }
    )
    await toast.present()
  }

  async showError(msg: string){
    let errorToast = await this.toastController.create(
      {
        message: msg,
        duration: 5000
      }
    )
    await errorToast.present();
  }

}
