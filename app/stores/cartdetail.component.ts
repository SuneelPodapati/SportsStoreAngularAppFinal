import { Component } from "@angular/core";
import { Cart } from "../models/cart.model";

@Component({
    moduleId: module.id,
    templateUrl: "cartdetail.component.html"
})

export class CartDetailComponent {
    constructor(public cart: Cart) { }
}
