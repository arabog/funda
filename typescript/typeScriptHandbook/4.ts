/*
-: Type Manipulation
Creating Types from Types

-: Generics
Generics - Types which take parameters
In languages like C# and Java, one of the main tools in the 
toolbox for creating reusable components is generics, that is, 
being able to create a component that can work over a variety of
types rather than a single one.

Hello World of Generics
To start off, let's do the "hello world" of generics: the identity 
function. The identity function is a function that will return 
back whatever is passed in.

Without generics, we would either have to give the identity 
function a specific type:

function identity(arg: number): number {
          return arg;
}

Or, we could describe the identity function using the any type:

function identity(arg: any): any {
          return arg;
}

While using any is certainly generic in that it will cause the 
function to accept any and all types for the type of arg , we 
actually are losing the information about what that type was 
when the function returns. If we passed in a number, the only 
information we have is that any type could be returned.

function identity<Type>(arg: Type): Type {
          return arg;
}

We've now added a type variable Type to the identity function. 
This Type allows us to capture the type the user provides (e.g. 
number ), so that we can use that information later. Here, we 
use Type again as the return type. On inspection, we can now 
see the same type is used for the argument and the return type. 
This allows us to traffic that type information in one side of the 
function and out the other.

We say that this version of the identity function is generic, as it 
works over a range of types.

Once we've written the generic identity function, we can call it in 
one of two ways. The first way is to pass all of the arguments, 
including the type argument, to the function:

let output = identity<string>('myString')

The second way is also perhaps the most common. Here we use 
type argument inference -- that is, we want the compiler to set 
the value of Type for us automatically based on the type of the
argument we pass in:

let output = identity('myString')


Notice that we didn't have to explicitly pass the type in the 
angle brackets ( <> ); the compiler just looked at the value 
"myString" , and set Type to its type. You may need to 
explicitly pass in the type arguments when the compiler fails 
to infer the type, as may happen in more complex examples.


-: Working with Generic Type Variables
When you begin to use generics, you'll notice that when you 
create generic functions like identity , the compiler will enforce 
that you use any generically typed parameters in the body of
the function correctly. That is, that you actually treat these 
parameters as if they could be any and all types.

What if we want to also log the length of the argument arg to the 
console with each call? We might be tempted to write this:

function loggingIdentity<Type>(arg: Type): Type {
          console.log(arg.length);
          
          Property 'length' does nt exist on type 'Type'

          return arg
}

When we do, the compiler will give us an error that we're using 
the .length member of arg , but nowhere have we said that arg 
has this member.

Let's say that we've actually intended this function to work on 
arrays of Type rather than Type directly. Since we're working 
with arrays, the .length member should be available. We can
describe this just like we would create arrays of other types:

funtion loggingId<Type>(arg: Type[]): Type[] {
          console.log(arg.length)
          return arg;
}

We can alternatively write the sample example this way:
function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
          console.log(arg.length); // Array has a .length, so no more error
          return arg;
}

-: Generic Types
function identity<Type>(arg: Type): Type {
          return arg;
}

let myIdentity:<Type> (arg: Type) => Type = identity

We could also have used a different name for the generic 
type parameter in the type, so long as the number of type
 variables and how the type variables are used line up.

 function identity<Type>(arg: Type): Type {
          return arg;
 }
 
 let myIdentity: <Input>(arg: Input) => Input = identity;

We can also write the generic type as a call signature of 
an object literal type:

function identity<Type>(arg: Type): Type {
          return arg;
}

let myIdentity: { <Type>(arg: Type): Type } = identity;

Let's take the object literal from the previous
example and move it to an interface:

interface GenericIdentityFn {
          <Tyoe>(arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
          return arg;
}

let myIdentity: GenericIdentity = identity


-: Generic Classes
A generic class has a similar shape to a generic interface. 
Generic classes have a generic type parameter list in angle 
brackets ( <> ) following the name of the class.

class GenericNumber<NumType> {
          zeroValue: NumType;
          add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;

myGenericNumber.add = function (x, y) {
          return x + y;
};

-: Generic Constraints
In our loggingIdentity example, we wanted to be able to 
access the .length property of arg , but the compiler could 
not prove that every type had a .length property, so it
warns us that we can't make this assumption.

function loggingIdentity<Type>(arg: Type): Type {
          console.log(arg.length);
          // Property 'length' does nt exist on type 'Type'

          return arg
}

Instead of working with any and all types, we'd like to 
constrain this function to work with any and all types 
that have the .length property

To do so, we'll create an interface that describes our constraint. 
Here, we'll create an interface that has a single .length property 
and then we'll use this interface and the extends keyword to
denote our constraint:

interface Lengthwise {
          length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
          console.log(arg.length) // // Now we know it has a .length property
          return arg;
}

Because the generic function is now constrained, it will no longer 
work over any and all types:

loggingIdentity(3);
Argument of type 'number' is nt assignable to parameter of type 'Lengthwise'


-: Using Type Parameters in Generic Constraints
You can declare a type parameter that is constrained by 
another type parameter. For example, here
we'd like to get a property from an object given its name. 
We'd like to ensure that we're not accidentally grabbing a 
property that does not exist on the obj , so we'll place a 
constraint between the two types:

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
          return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, 'a');
getProperty(x, 'm');
Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.

-: Using Class Types in Generics
When creating factories in TypeScript using generics, it is necessary 
to refer to class types by their constructor functions. For example,

function create<Type>(c: { new (): Type }): Type {
          return new c();
}





cont on pg 116

ReactTS pg 194

NextJS pg 184
*/ 
