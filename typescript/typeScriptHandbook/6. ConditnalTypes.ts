/*
-: Conditional Types
Conditional types help describe the relation between the
types of inputs and outputs.

interface Animal {
          live(): void;
}

interface Dog extends Animal {
          woof: () => void
}

type Example1 = Dog extends Animal ? number : string

type Example2 = RegExp extends Animal ? number : string;

When the type on the left of the extends is assignable to the 
one on the right, then you'll get the type in the first branch 
(the "true" branch); otherwise you'll get the type in the latter 
branch (the"false" branch).

The power of conditional types comes from using them 
with generics

For example, let's take the following createLabel function:

interface IdLabel {
          id: number /* some fields 
}
interface NameLabel {
          name: string /* other fields 
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;

function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
          throw "unimplemented";
}

These overloads for createLabel describe a single JavaScript 
function that makes a choice based on the types of its inputs.

Instead, we can encode that logic in a conditional type:
type NameOrId<T extends number | string> = T extends number
          ? IdLabel : NameLabel

We can then use that conditional type to simplify our overloads 
down to a single function with no overloads.

interface IdLabel {
          id: number 
}

interface NameLabel {
          name: string
}

type NameOrId<T extends number | string> = T extends number
          ? IdLabel
          : NameLabel;

function createLabel<T extends number | string> (idOrName: T): NameOrId<T> {
          throw "unimplemented";
}

let a = createLabel("typescript"); let a: NameLabel
let b = createLabel(2.8); let b: IdLabel
let c = createLabel(Math.random() ? "hello" : 42); let c: NameLabel | IdLabel

Distributive Conditional Types
When conditional types act on a generic type, they become distributive 
when given a union type. For example, take the following:

type ToArray<Type> = Type extends any ? Type[] : never;

-: Mapped Types
type OnlyBoolsAndHorses = {
          [key: string]: boolean | Horse;
};
const conforms: OnlyBoolsAndHorses = {
          del: true,
          rodney: false,
};







*/