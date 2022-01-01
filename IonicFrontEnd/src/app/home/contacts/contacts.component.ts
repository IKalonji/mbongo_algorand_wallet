import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { toastController } from '@ionic/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {

  contactsList: any[] = [];

  constructor(private apiService: ApiServiceService,
    private alertController: AlertController,
    private toastController: ToastController) { 
      this.getContacts();
    }

  ngOnInit() {}

  getContacts(){
    this.apiService.getContacts().subscribe(data =>{
      this.contactsList = data['user_contacts'];
    })
  }

  async payAgain(userToPay:any){
    let alertToPay = await this.alertController.create(
      {
        header: "Enter amount to pay",
        inputs: [
          {
            name: "amount",
            value: "text",
            placeholder: "Amount"
          }
        ],
        buttons: [
          {
            text: "Confirm",
            handler: (alertData) => {
              this.apiService.postPayment(alertData.amount, userToPay['account'], userToPay['name']).subscribe(data =>
                {

                }
              )
            }
          }, 'Cancel'
        ]
      }
    )
  }

  async toastPayment(){
    let payment = await toastController.create({
      message: "Payment made",
      duration: 3000
    })

    await payment.present()
  }

}
