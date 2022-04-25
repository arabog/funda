interface IProduct {
          name: string;
          unitPrice: number;
}

function calculateTotalPrice(product: IProduct, quantity: number, discount: number): number {
          var priceWithoutDiscount = product.price * quantity;
          var discountAmount = priceWithoutDiscount * discount;

          return priceWithoutDiscount - discountAmount;
}