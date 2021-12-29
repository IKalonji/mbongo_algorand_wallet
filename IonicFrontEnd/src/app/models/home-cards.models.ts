import { ScanPaymentComponent } from "../home/scan-payment/scan-payment.component";
import { CreateQrComponent } from "../home/create-qr/create-qr.component";


export const HomePageCards = [
    {
        icon: "cash-outline",
        name: "Payment",
        component: ScanPaymentComponent
    },
    {
        icon: "qr-code-outline",
        name: "Create QR",
        component: CreateQrComponent
    },
]
