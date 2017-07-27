import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { OrderRepository } from "../models/order.repository";
import { Order } from "../models/order.model";

@Component({
    moduleId: module.id,
    templateUrl: "checkout.component.html",
    styleUrls: ["checkout.component.css"]
})

export class CheckoutComponent {
    orderSent: boolean = false;
    submitted: boolean = false;

    constructor(public repository: OrderRepository, public order: Order) {
        order.customerName = "Tintin"; order.address = "King's Circle"; order.city = "Mumbai";
        order.state = "Maharashtra"; order.zip = "400019"; order.country = "India";
        
        console.log("CheckoutComponent:Order Details -> " + JSON.stringify(order));
    }

    submitOrder(form: NgForm) {
        this.submitted = true;
        if (form.valid) {
            // console.log("Form is Valid");
            this.repository.saveOrder(this.order).subscribe(order => {
                this.order.clear();
                this.orderSent = true;
                this.submitted = false;
            });
        }
    }
}