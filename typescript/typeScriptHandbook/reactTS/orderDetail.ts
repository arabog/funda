interface Product {
          name: string;
          unitPrice: number;
}

class OrderDetails {
          product: Product;

          quantity: number;

          getTotal(discount: number): number {
                    const priceWithoutDiscount = this.product.unitPrice * this.quantity;

                    const discountAmount = priceWithoutDiscount * discount;
                    
                    return priceWithoutDiscount - discountAmount;
          }
}

