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















cont on pg 89
*/ 