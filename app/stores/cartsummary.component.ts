import { Component } from "@angular/core";
import { Cart } from "../models/cart.model";

@Component({
    selector: "cart-summary",
    moduleId: module.id,
    templateUrl: "cartsummary.component.html"
})

export class CartSummaryComponent {
    constructor(public cart: Cart) { }
}
