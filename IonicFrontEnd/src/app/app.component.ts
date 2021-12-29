import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiServiceService } from './services/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  signedIn: boolean = false;

  constructor(public loadingController: LoadingController,
    private alertController: AlertController,
    private apiService: ApiServiceService) {
      this.setAccount()
    }

  async setAccount(){
    let select = await this.alertController.create(
      {
        header: "Cellphone Number:",
        inputs: [
          {
            name: 'username',
            type: 'text',
            placeholder: 'Enter cellphone number'
          }
        ],
        buttons: [
          {
            text: 'Login/Sign-up',
            handler: (alertData) => {
              this.showProgressSpinner();
              this.apiService.setUsername(alertData.username);
              this.apiService.getBalance();
              this.signedIn = true;
            }
          },
        ],
        backdropDismiss: false,
      }
    )
    await select.present();
  }

  async showProgressSpinner(){
    const loading = await this.loadingController.create({
      spinner: "bubbles",
      duration: 5000,
      message: 'Loading account, please wait',
      translucent: false,
      // cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    await loading.present()
  }
}
