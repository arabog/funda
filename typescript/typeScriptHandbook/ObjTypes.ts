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



















cont on pg 89
*/ 