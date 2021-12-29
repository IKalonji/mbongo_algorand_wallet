import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } 
        from '@techiediaries/ngx-qrcode';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './create-qr.component.html',
  styleUrls: ['./create-qr.component.scss'],
})
export class CreateQrComponent implements OnInit {
  
  showQRCode = false;

  // We can have Canvas/Img/Url as elementType
  elementType = NgxQrcodeElementTypes.URL;
  
  // We can have High/Low/Medium/Quartile
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  
  // Need to specify the valid account address
  value : string = '';

  constructor(private toastController: ToastController, private apiService: ApiServiceService) { }

  ngOnInit() {}

  showQR(){
    let QRMetaData = {
      receiver: this.apiService.userAccount,
    };
    this.value = JSON.stringify(QRMetaData);
    this.showQRCode = true;
  }

}
