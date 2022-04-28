/*
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

-: Control flow analysis
function padLeft(padding: number | string, input: string) {
          if(typeof padding === 'number') {
                    return ' '.repeat(padding) + input;
          }

          return padding + input;
}

TypeScript was able to analyze this code and see that the 
rest of the body ( return padding + input; ) is unreachable 
in the case where padding is a number . As a result, it was 
able to remove number from the type of padding (narrowing
from string | number to string ) for the rest of the function.

This analysis of code based on reachability is called control 
flow analysis

When a variable is analyzed, control flow can split off and 
re-merge over and over again, and that variable can be
observed to have a different type at each point.









*/

function example() {
          let x: string | number | boolean;

          x = Math.random() < 0.5;
          console.log(x);     //x: boolean

          if (Math.random() < 0.5) {
                    x = "hello";
                    console.log(x);     //x: string
          } else {
                    x = 100;
                    console.log(x);     //x: number
          }

          return x; //x: string | number
}
