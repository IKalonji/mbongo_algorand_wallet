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
              this.apiService.getUser(alertData.username).subscribe(
                data => {
                  console.log(data['account_metadata'].customer_id, data['account_metadata'].id)
                  this.signedIn = this.apiService.setUsernameAndAccount(data['account_metadata'].customer_id, data['account_metadata'].id)
                  this.loadingController.dismiss();
                }
              );
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
      message: 'Loading account, please wait',
      translucent: false,
      backdropDismiss: false
      }
    );
    if (this.signedIn == true){
      loading.dismiss();
    }
    await loading.present()
  }
  
}
