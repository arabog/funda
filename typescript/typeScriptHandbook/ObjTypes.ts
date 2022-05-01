/*
-: Object Types
In JavaScript, the fundamental way that we group and 
pass around data is through objects.

function greet(person: {name: string, age: number}) {
          return 'Hello' + person.name;
}

or they can be named by using either an interface

interface Person {
          name: string;
          age: number;
}

function greet(person: Person) {
          return 'Hello' + person.name
}

or a type alias.

type Person = {
          name: string;
          age: number;
}

function greet(person: Person) {
          return 'Hello' + person.name
}


-: Property Modifiers
Each property in an object type can specify a couple of things: 
the type, whether the property is optional, and whether the 
property can be written to.

All optionality really says is that if the property is set, it 
better have a specific type.

Note that there is currently no way to place type annotations 
within destructuring patterns. This is because the following 
syntax already means something different in JavaScript.

function draw({ shape: Shape, xPos: number = 100 }) {
          render(shape);
          Cannot find name 'shape'. Did you mean 'Shape'?

          render(xPos);
          Cannot find name 'xPos'.         
}

In an object destructuring pattern, shape: Shape means "
grab the property shape and redefine it locally as a variable 
named Shape . Likewise xPos: number creates a variable 
named number whose value is based on the parameter's xPos .

-: readonly Properties
Properties can also be marked as readonly for TypeScript. 
While it won't change any behavior at runtime, a property 
marked as readonly can't be written to during type-checking.

interface SomeType {
          readonly prop: string;
}

function doSmth(obj: SomeType) {
          // We can read from 'obj.prop'.
          console.log(`prop has the value '${obj.prop}'`)

          // But we can't re-assign it.
          obj.prop = 'hello'
          // Cannot assignto 'prop' because it is a a read-only property.
}

Using the readonly modifier doesn't necessarily imply that a value 
is totally immutable - or in other words, that its internal contents 
can't be changed. It just means the property itself can't be rewritten to.

interface Home {
          readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
          // We can read and update properties from 'home.resident'.
          console.log(`Happy birthday ${home.resident.name}!`);

          home.resident.age++;
}

function evict(home: Home) {
          // But we can't write to the 'resident' property itself on a 'Home'.
          home.resident = {
                              // Cannot assign to 'resident' because it is a a read-only property.
                              name: "Victor the Evictor",
                              
                              age: 42,
                    };
}


-: Index Signatures
Sometimes you don't know all the names of a type's properties 
ahead of time, but you do know the shape of the values.
In those cases you can use an index signature to describe the 
types of possible values, for example:

interface StringArr {
          [index: number]: string
}

Above, we have a StringArray interface which has an index 
signature. This index signature states that when a 
StringArray is indexed with a number , it will return a string .

An index signature property type must be either 'string' or 'number'.

In the following example, name 's type does not match the string 
index's type, and the type checker gives an error:

interface NumberDictionary {
          [index: string]: number;

          length: number; // ok
          
          name: string;
          Property 'name' of type 'string' is not assignable to 'string' 
          index type 'number'.
}

However, properties of different types are acceptable if the index 
signature is a union of the property types:

interface NumberOrStringDictionary {
          [index: string]: number | string;
          length: number; // ok, length is a number
          name: string; // ok, name is a string
}

Finally, you can make index signatures readonly in order to 
prevent assignment to their indices:

interface ReadonlyStringArray {
          readonly [index: number]: string;
}


-: Extending Types
It's pretty common to have types that might be more specific 
versions of other types. For example, we might have a 
BasicAddress type that describes the fields necessary for 
sending letters and packages in the U.S.

interface BasicAddress {
          name?: string;
          street: string;
          city: string;
          country: string;
          postalCode: string;
}

In some situations that's enough, but addresses often have 
a unit number associated with them if the building at an 
address has multiple units. We can then describe an 
AddressWithUnit .

interface AddressWithUnit {
          name?: string;
          unit: string;
          street: string;
          city: string;
          country: string;
          postalCode: string;
}

AddressWithUnit can be rewritten as:
interface AddressWithUnit extends BasidAddress {
          unit: string
}

The extends keyword on an interface allows us to effectively 
copy members from other named types, and add whatever 
new members we want.

interface s can also extend from multiple types.
interface ColorfulCircle extends Colorful, Circle {}


-: Intersection Types
intersection types is mainly used to combine existing object
types.

An intersection type is defined using the & operator.


interface Colorful {
          color: string;
}

interface Circle {
          radius: number;
}

type ColorfulCircle = Colorful & Circle

Here, we've intersected Colorful and Circle to produce a new 
type that has all the members of Colorful and Circle .

function draw(circle: Colorful & Circle) {
          console.log(`Color was ${circle.color}`);
          console.log(`Radius was ${circle.radius}`);
}

// okay
draw({ color: "blue", radius: 42 });

// oops
draw({ color: "red", raidus: 42 });

generic type
interface Box<Type> {
          contents: Type;
}

Later on, when we refer to Box , we have to give a type 
argument in place of Type .
let box: Box<string>;

Think of Box as a template for a real type, where Type is 
a placeholder that will get replaced with some other type. 
When TypeScript sees Box<string> , it will replace every 
instance of Type in Box<Type> with string , and end up 
working with something like { contents: string } . In
other words, Box<string>

interface Box<Type> {
          contents: Type;
}
interface StringBox {
          contents: string;
}
let boxA: Box<string> = { contents: "hello" };
boxA.contents;

Box is reusable in that Type can be substituted with anything. 
That means that when we need a box for a new type, we don't 
need to declare a new Box type at all (though we certainly 
could if we wanted to).

This also means that we can avoid overloads entirely by instead 
using generic functions.

interface Box<Type> {
          contents: Type;
}

function setContents<Type>(box: Box<Type>, newContent: Type) {
          box.content = newContent
}

It is worth noting that type aliases can also be generic. We could 
have defined our new Box<Type> interface, which was:

interface Box<Type> {
          contents: Type;
}

by using a type alias instead:

type Box<Type> = {
          contents: Type;
};

Since type aliases, unlike interfaces, can describe more than just 
object types, we can also use them to write other kinds of generic 
helper types.

type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>


-: The Array Type
Whenever we write out types like number[] or string[] , that's really 
just a shorthand for Array<number> and Array<string>

Much like the Box type above, Array itself is a generic type.

interface Array<Type> {
          * Gets or sets the length of the array.
          length: number;

          * Removes the last element from an array and returns it.
          pop(): Type | undefined;
          
          * Appends new elements to an array, and returns the new length of the a
          push(...items: Type[]): number;
}

Modern JavaScript also provides other data structures which are generic, 
like Map<K, V> , Set<T> , and Promise<T> .


-: The ReadonlyArray Type


cont on pg 95
*/ 

interface Box<Type> {
          content: Type 
}

let box: Box<number | string> = {content: 25}

