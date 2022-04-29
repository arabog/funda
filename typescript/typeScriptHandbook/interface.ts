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
For some motivation, let's imagine we're trying to encode shapes 
like circles and squares. Circles keep track of their radiuses and 
squares keep track of their side lengths. We'll use a field called
kind to tell which shape we're dealing with. Here's a first attempt 
at defining Shape .

interface Shape {
          kind: 'circle' | 'square';
          radius?: number;
          sideLength?; number;
}

Notice we're using a union of string literal types: "circle" 
and "square" to tell us whether we should treat the shape 
as a circle or square respectively. By using "circle" | "square" 
instead of string, we can avoid misspelling issues.

function handleShape(shape: Shape) {
          // oops: This condition will always return 'false' since the 
          // types '"circle" | "square"' and '"rect"' have no overlap
          if(shape.kind === 'rect') {

          }
}

We can write a getArea function that applies the right logic 
based on if it's dealing with a circle or square. We'll first 
try dealing with circles.

function getArea(shape: Shape) {
          return Math.PI * shape.radius ** 2;
          // Object is possibly 'undefined'.
}

Under strictNullChecks that gives us an error - which is 
appropriate since radius might not be defined. But what 
if we perform the appropriate checks on the kind property?

function getArea(shape: Shape) {
          if (shape.kind === 'circle') {
                    return Math.PI * shape.radius ** 2;
                    // Object is possibly 'undefined'.
          }
}

Hmm, TypeScript still doesn't know what to do here. We've 
hit a point where we know more about our values than the 
type checker does. We could try to use a non-null assertion 
(a ! after shape.radius ) to say that radius is definitely present.

function getArea(shape: Shape) {
          if (shape.kind === "circle") {
                    return Math.PI * shape.radius! ** 2;
          }
}


The problem with this encoding of Shape is that the type-checker 
doesn't have any way to know whether or not radius or sideLength 
are present based on the kind property. We need to communicate 
what we know to the type checker. With that in mind, let's take 
another swing at defining Shape .

interface Circle {
          kind: 'circle';
          radius: number;
}

interface Square {
          kind:  'square';
          sideLength: number;
}

type Shape = Circle | Square;

Here, we've properly separated Shape out into two types 
with different values for the kind property, but radius and 
sideLength are declared as required properties in their 
respective types.

Let's see what happens here when we try to access the 
radius of a Shape .

function getArea(shape: Shape) {
          return Math.PI * shape.radius ** 2;
          // Property 'radius' does not exist on type 'Shape'.
          // Property 'radius' does not exist on type 'Square'.
}

Like with our first definition of Shape , this is still an error. 
When radius was optional, we got an error (with 
strictNullChecks enabled) because TypeScript couldn't tell 
whether the property was present. Now that Shape is a union, 
TypeScript is telling us that shape might be a Square , and 
Square s don't have radius defined on them! Both 
interpretations are correct, but only the union encoding of 
Shape will cause an error regardless of how strictNullChecks 
is configured.

But what if we tried checking the kind property again?

interface Circle {
          kind: 'circle';
          radius: number;
}

interface Square {
          kind:  'square';
          sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
          if (shape.kind === 'circle') {
                    return Math.PI * shape.radius ** 2;
          }
}

That got rid of the error! When every type in a union 
contains a common property with literal types, TypeScript 
considers that to be a discriminated union, and can narrow 
out the members of the union.

In this case, kind was that common property (which is what's 
considered a discriminant property of Shape ). Checking 
whether the kind property was "circle" got rid of every type 
in Shape that didn't have a kind property with the type "circle" . 
That narrowed shape down to the type Circle.

The same checking works with switch statements as well. Now 
we can try to write our complete getArea without any pesky ! 
non-null assertions.

interface Circle {
          kind: 'circle';
          radius: number;
}

interface Square {
          kind:  'square';
          sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
          switch(shape.kind) {
                    case 'circle':
                              return Math.PI * shape.radius ** 2;     //shape: Circle

                    case 'square':
                              return shape.sideLength ** 2;           ////shape: Square
          }
}

===============
-: The never type:
TypeScript will use a never type to represent a state 
which shouldn't exist.

Exhaustiveness checking
For example, adding a default to our getArea function which tries 
to assign the shape to never will raise when every possible case 
has not been handled.

type Shape = Circle | Square

function getArea(shape: Shape) {
          switch(shape.kind) {
                    case 'circle':
                              return Math.PI * shape.radius ** 2;

                    case 'square:
                              return shape.sideLength ** 2;

                    default: 
                              const _exhaustiveCheck: never = shape;
                              return _exhaustiveCheck;
          }
}

Adding a new member to the Shape union, will cause 
a TypeScript error:

interface Triangle {
          kind: "triangle";
          sideLength: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape) {
          switch(shape.kind) {
                    case 'circle':
                              return Math.PI * shape.radius ** 2;

                    case 'square:
                              return shape.sideLength ** 2;

                    default: 
                              const _exhaustiveCheck: never = shape;
                              // Type 'Triangle' is not assignable to type 'never'
                              return _exhaustiveCheck;
          }
}

*/


