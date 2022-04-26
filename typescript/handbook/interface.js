var table = {
    name: "Table",
    unitPrice: 500
};
var tableOrder = {
    product: table,
    quantity: 1,
    getTotal: function (discount) {
        var priceWithoutDiscount = this.product.unitPrice * this.quantity;
        var discountAmount = priceWithoutDiscount * discount;
        return priceWithoutDiscount - discountAmount;
    }
};
console.log(tableOrder.getTotal(20));
