"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var PROTOCOL = "http";
var PORT = 3500;
var RestDataSource = (function () {
    function RestDataSource(http) {
        this.http = http;
        this.baseUrl = PROTOCOL + "://" + location.hostname + ":" + PORT + "/";
        console.log("Base Url: " + this.baseUrl);
    }
    RestDataSource.prototype.authenticate = function (user, pass) {
        var _this = this;
        return this.http.request(new http_1.Request({
            method: http_1.RequestMethod.Post, url: this.baseUrl + "login",
            body: { name: user, password: pass }
        })).map(function (response) {
            var r = response.json();
            _this.auth_token = r.success ? r.token : null;
            return r.success;
        });
    };
    // With Auth
    RestDataSource.prototype.sendRequest = function (verb, url, body, auth) {
        if (auth === void 0) { auth = false; }
        var request = new http_1.Request({
            method: verb,
            url: this.baseUrl + url,
            body: body
        });
        if (auth && this.auth_token != null) {
            request.headers.set("Authorization", "Bearer<" + this.auth_token + ">");
        }
        return this.http.request(request).map(function (response) { return response.json(); });
    };
    // Without Auth
    //private sendRequest(verb: RequestMethod, url: string, body?: Product | Order): Observable<Product | Order> {
    //   //console.log("From sendRequest url -> " + url);
    //   return this.http.request(new Request({
    //       method: verb,
    //       url: this.baseUrl + url,
    //       body: body
    //   })).map(response => response.json());
    //}
    RestDataSource.prototype.getProducts = function () {
        return this.sendRequest(http_1.RequestMethod.Get, "products");
    };
    RestDataSource.prototype.saveOrder = function (order) {
        console.log("From RestDataSource:\n " + JSON.stringify(order));
        return this.sendRequest(http_1.RequestMethod.Post, "orders", order);
    };
    // all the following methods are for Admin
    RestDataSource.prototype.saveProduct = function (product) {
        return this.sendRequest(http_1.RequestMethod.Post, "products", product, true);
        // return this.sendRequest(RequestMethod.Post, "products", product)
    };
    RestDataSource.prototype.updateProduct = function (product) {
        return this.sendRequest(http_1.RequestMethod.Put, "products/" + product.id, product, true);
        // return this.sendRequest(RequestMethod.Put, `products/${product.id}`, product) 
    };
    RestDataSource.prototype.deleteProduct = function (id) {
        return this.sendRequest(http_1.RequestMethod.Delete, "products/" + id, null, true);
        // return this.sendRequest(RequestMethod.Delete, `products/${id}`, null);
    };
    RestDataSource.prototype.getOrders = function () {
        return this.sendRequest(http_1.RequestMethod.Get, "orders", null, true);
        // return this.sendRequest(RequestMethod.Get, "orders", null);
    };
    RestDataSource.prototype.deleteOrder = function (id) {
        return this.sendRequest(http_1.RequestMethod.Delete, "orders/" + id, null, true);
        // return this.sendRequest(RequestMethod.Delete, `orders/${id}`, null);
    };
    RestDataSource.prototype.updateOrder = function (order) {
        return this.sendRequest(http_1.RequestMethod.Put, "orders/" + order.id, order, true);
        // return this.sendRequest(RequestMethod.Put, `orders/${order.id}`, order);
    };
    RestDataSource = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RestDataSource);
    return RestDataSource;
}());
exports.RestDataSource = RestDataSource;
//# sourceMappingURL=rest.datasource.js.map