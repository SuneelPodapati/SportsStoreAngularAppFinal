import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { StoreModule } from "./stores/store.module";
import { StoreComponent } from "./stores/store.component";
import { CartDetailComponent } from "./stores/cartdetail.component";
import { RouterModule } from "@angular/router";
import { StoreFirstGuard } from "./storefirst.guard";
import { CheckoutComponent } from "./stores/checkout.component";

@NgModule({
    imports: [BrowserModule, StoreModule, RouterModule.forRoot([
        { path: "store", component: StoreComponent, canActivate: [StoreFirstGuard] },
        { path: "cart", component: CartDetailComponent, canActivate: [StoreFirstGuard] },
        { path: "checkout", component: CheckoutComponent, canActivate: [StoreFirstGuard] },
        { path: "admin", loadChildren: "app/admin/admin.module#AdminModule" },
        { path: "**", redirectTo: "/store" }
    ])],
    providers: [StoreFirstGuard],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})

export class AppModule { }