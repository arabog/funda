/*
Types Operator
-: Keyof Type Operator
The keyof operator takes an object type and produces a string 
or numeric literal union of its keys.
The following type P is the same type as "x" | "y":

type Point = {x: number, y: number};
type P = keyof Point;

If the type has a string or number index signature, keyof 
will return those types instead:

type Arrayish = {[n: number]: unknown }
type A = keyof Arrayish






*/ 
