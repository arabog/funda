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


cont on pg 105

ReactTS pg 174

NextJS pg 169
*/ 