class OrderDetail {
          product: Product;
          quntity: number;

          getTotal(discount: number): number {
                    const priceWithoutDiscount = this.product.unitPrice * this.quantity;
                    const discountAmount = priceWithoutDiscount * discount;
                    
                    return priceWithoutDiscount - discountAmount;
          }
}