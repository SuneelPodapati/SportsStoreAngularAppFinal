import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { StoreComponent } from "./store.component";
import { ModelModule } from "../models/model.module";
import { CounterDirective } from "./counter.directive";
import { CartSummaryComponent } from "./cartsummary.component";
import { CartDetailComponent } from "./cartdetail.component";
import { RouterModule } from "@angular/router";
import { CheckoutComponent } from "./checkout.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [BrowserModule, ModelModule, RouterModule, FormsModule],
    declarations: [StoreComponent, CounterDirective, CartSummaryComponent, CartDetailComponent, CheckoutComponent],
    exports: [StoreComponent, CartDetailComponent, CheckoutComponent]
})

export class StoreModule { }