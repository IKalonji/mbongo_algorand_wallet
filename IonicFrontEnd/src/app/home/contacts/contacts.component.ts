import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {

  contactsList: any[] = [];
  displayContact: contact[] = [];

  constructor(private apiService: ApiServiceService,
    private alertController: AlertController,
    private toastController: ToastController) { 
      this.getContacts();
    }

  ngOnInit() {}

  getContacts(){
    this.apiService.getContacts().subscribe(data =>{
      this.contactsList = data['user_contacts'];
      this.contactsList.forEach(element => {
        let contact: contact = {account:element['account'], name:element['name']}
        this.displayContact.push(contact)
      });
    })
  }

  async payAgain(userToPay:contact){
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
              this.apiService.postPayment(alertData.amount, userToPay.account, userToPay.name).subscribe(data =>
                {
                  this.toastPayment();
                }
              )
            }
          }, 'Cancel'
        ]
      }
    )

    await alertToPay.present()
  }

  async toastPayment(){
    let payment = await this.toastController.create({
      message: "Payment made",
      duration: 3000
    })

    await payment.present()
  }

}

export interface contact{
  account:string,
  name:string
}
