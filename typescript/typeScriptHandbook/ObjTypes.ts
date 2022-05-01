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











cont on pg 89
*/ 
