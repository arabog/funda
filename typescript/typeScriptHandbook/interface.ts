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


-: Using type predicates
To define a user-defined type guard, we simply need to 
define a function whose return type is a type predicate:

type Fish = {swim: () => void}
type Bird = {fly: () => void}

function isFish(pet: Fish | Bird): pet is Fish {
          return (pet as Fish).swim !== undefined;
}

pet is Fish is our type predicate in this example. A 
predicate takes the form parameterName is Type , 
where parameterName must be the name of a 
parameter from the current function signature.

Any time isFish is called with some variable, TypeScript 
will narrow that variable to that specific type if the 
original type is compatible.

type Fish = {swim: () => void}
type Bird = {fly: () => void}

function isFish(pet: Fish | Bird): pet is Fish {
          return (pet as Fish).swim !== undefined;
}

let pet = getSmallPet();

if(isFish(pet)) {
          pet.swim();
}else {
          pet.fly();
}

Notice that TypeScript not only knows that pet is a Fish in 
the if branch; it also knows that in the else branch, you 
don't have a Fish , so you must have a Bird .

You may use the type guard isFish to filter an array of 
Fish | Bird and obtain an array of Fish :

type Fish = {swim: () => void}
type Bird = {fly: () => void}

type getSmallPet = () => void

const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];


function isFish(pet: Fish | Bird): pet is Fish {
          return (pet as Fish).swim !== undefined;
}


const underWater1: Fish[] = zoo.filter(isFish);
// or, equivalently
const underWater2: Fish[] = zoo.filter(isFish) as Fish[]

// d predicate may need repeating 4 more complex examples
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
          if(pet.name === 'sharkey') return false;

          return isFish(pet);
})


-: Discriminated unions









cont on pg 53
*/


