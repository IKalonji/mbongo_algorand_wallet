import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { CreateQrComponent } from './create-qr/create-qr.component';
import { ScanPaymentComponent } from './scan-payment/scan-payment.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgxQRCodeModule,
    HttpClientModule
  ],
  declarations: [HomePage,CreateQrComponent,ScanPaymentComponent,],
  providers: [BarcodeScanner]
})
export class HomePageModule {}
