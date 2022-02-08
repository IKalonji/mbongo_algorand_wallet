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

  domain: string = "";

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
        // this.setAccount();
      }else{ 
        this.showProgressSpinner('An error occurred, close the app!')
      }
    })
  }

  // async setAccount(){
  //   let select = await this.alertController.create(
  //     {
  //       header: "Cellphone Number:",
  //       inputs: [
  //         {
  //           name: 'username',
  //           type: 'text',
  //           placeholder: 'Enter cellphone number'
  //         }
  //       ],
  //       buttons: [
  //         {
  //           text: 'Login/Sign-up',
  //           handler: (alertData) => {
  //             this.showProgressSpinner('Loading account, please wait');
  //             this.apiService.getUser("issa").subscribe(
  //               data => {
  //                 this.signedIn = this.apiService.setUsernameAndAccount(data['account_metadata'].customer_id, data['account_metadata'].account_id)
  //                 this.loadingController.dismiss();
  //               }
  //             );
  //           }
  //         },
  //       ],
  //       backdropDismiss: false,
  //     }
  //   )
  //   await select.present();
  // }

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
  
  async setAccount(){

    this.showProgressSpinner('Loading/Resolving account, please wait');
    this.apiService.getUser(this.domain).subscribe(
      data => {
        this.signedIn = this.apiService.setUsernameAndAccount(data['account_metadata'].customer_id, data['account_metadata'].account_id)
        this.loadingController.dismiss();
        this.apiService.connectToUnstoppable(this.domain).subscribe(data => {
          console.log(data)
        })
      }
    );
  }
}
