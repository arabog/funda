interface Product {
          name: string;
          unitPrice: number;
}

interface OrderDetail {
          product: Product;
          quantity: number;
          getTotal(number): number;
}

const table: Product = {
          name: "Table",
          unitPrice: 500
}

const tableOrder: OrderDetail = {
          product: table,
          quantity: 1,
          getTotal(discount: number) : number {
                    const priceWithoutDiscount = this.product.unitPrice * this.quantity;
                    const discountAmount = priceWithoutDiscount * discount;
                    return priceWithoutDiscount - discountAmount;
          }
};

console.log(tableOrder.getTotal(20))