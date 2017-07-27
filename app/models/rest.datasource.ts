import { Injectable } from "@angular/core";
import { Http, Request, RequestMethod } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Product } from "./product.model";
import { Cart } from "./cart.model";
import { Order } from "./order.model";
import "rxjs/add/operator/map";

const PROTOCOL = "http";
const PORT = 3500;

@Injectable()

export class RestDataSource {
    baseUrl: string;
    auth_token: string;

    constructor(private http: Http) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
        console.log("Base Url: " + this.baseUrl);
    }

    authenticate(user: string, pass: string): Observable<boolean> {
        return this.http.request(new Request({
            method: RequestMethod.Post, url: this.baseUrl + "login",
            body: { name: user, password: pass }
        })).map(response => {
            let r = response.json();
            this.auth_token = r.success ? r.token : null;
            return r.success;
        });
    }

    // With Auth
    private sendRequest(verb: RequestMethod, url: string, body?: Product | Order, auth: boolean = false): Observable<Product | Product[] | Order | Order[]> {
        let request = new Request({
            method: verb,
            url: this.baseUrl + url,
            body: body
        });
        if (auth && this.auth_token != null) {
            request.headers.set("Authorization", `Bearer<${this.auth_token}>`);
        }
        return this.http.request(request).map(response => response.json());
    }


    // Without Auth
    //private sendRequest(verb: RequestMethod, url: string, body?: Product | Order): Observable<Product | Order> {
    //   //console.log("From sendRequest url -> " + url);
    //   return this.http.request(new Request({
    //       method: verb,
    //       url: this.baseUrl + url,
    //       body: body
    //   })).map(response => response.json());
    //}

    getProducts(): Observable<Product[]> {
        return this.sendRequest(RequestMethod.Get, "products");
    }

    saveOrder(order: Order): Observable<Order> {
        console.log(`From RestDataSource:\n ${JSON.stringify(order)}`);
        return this.sendRequest(RequestMethod.Post, "orders", order);
    }

    // all the following methods are for Admin
    saveProduct(product: Product): Observable<Product> {
        return this.sendRequest(RequestMethod.Post, "products", product, true)
        // return this.sendRequest(RequestMethod.Post, "products", product)
    }

    updateProduct(product): Observable<Product> {
        return this.sendRequest(RequestMethod.Put, `products/${product.id}`, product, true);
        // return this.sendRequest(RequestMethod.Put, `products/${product.id}`, product) 
    }

    deleteProduct(id: number): Observable<Product> {
        return this.sendRequest(RequestMethod.Delete, `products/${id}`, null, true);
        // return this.sendRequest(RequestMethod.Delete, `products/${id}`, null);
    }

    getOrders(): Observable<Order[]> {
        return this.sendRequest(RequestMethod.Get, "orders", null, true);
        // return this.sendRequest(RequestMethod.Get, "orders", null);
    }

    deleteOrder(id: number): Observable<Order> {
        return this.sendRequest(RequestMethod.Delete, `orders/${id}`, null, true);
        // return this.sendRequest(RequestMethod.Delete, `orders/${id}`, null);
    }

    updateOrder(order: Order): Observable<Order> {
        return this.sendRequest(RequestMethod.Put, `orders/${order.id}`, order, true);
        // return this.sendRequest(RequestMethod.Put, `orders/${order.id}`, order);
    }

}