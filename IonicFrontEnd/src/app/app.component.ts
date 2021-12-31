import { Component } from '@angular/core';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
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
    private apiService: ApiServiceService,
    private platform: Platform) {
      this.initAppToBackend()
    }

  initAppToBackend(){
    this.showProgressSpinner('Connecting App, please wait')
    this.apiService.initializeFrontendWithTatumAPI_KEY().subscribe(data =>{
      console.log("data: ", data);
      let result:string = data['response']
      let message = data['message']
      if (result.toLowerCase() == 'ok'){
        this.loadingController.dismiss();
        this.setAccount();
      }
    })
  }

  async setAccount(){
    let platformStrings = '';
    this.platform.platforms().forEach(element => {
      platformStrings += element;
    });
    let select = await this.alertController.create(
      {
        header: "Cellphone Number:",
        subHeader: platformStrings,
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
              this.showProgressSpinner('Loading account, please wait');
              this.apiService.getUser(alertData.username).subscribe(
                data => {
                  // console.log(data['account_metadata'].customer_id, data['account_metadata'].id)
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

  async showProgressSpinner(info:string){
    const loading = await this.loadingController.create({
      spinner: "bubbles",
      message: info,
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
