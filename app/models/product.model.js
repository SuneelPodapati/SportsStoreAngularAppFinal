"use strict";
var Product = (function () {
    function Product(id, productName, category, description, price) {
        this.id = id;
        this.productName = productName;
        this.category = category;
        this.description = description;
        this.price = price;
    }
    return Product;
}());
exports.Product = Product;
//# sourceMappingURL=product.model.js.map