var OrderDetails = /** @class */ (function () {
    function OrderDetails() {
    }
    OrderDetails.prototype.getTotal = function (discount) {
        var priceWithoutDiscount = this.product.unitPrice * this.quantity;
        var discountAmount = priceWithoutDiscount * discount;
        return priceWithoutDiscount - discountAmount;
    };
    return OrderDetails;
}());
