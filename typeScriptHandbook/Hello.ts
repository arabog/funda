/* to run d code: tsc hello.ts

Greets d world
console.log('Hello World!');

function greet(person: string, date: Date) {
          console.log(`Hello ${person}, today is ${date.toDateString()}!`)
}

greet('Brendan', new Date())

*/

function greet(person, date) {
          console.log('Hello '.concat(person, ', today is ').concat(date.toDateString()))
}

greet('Brendan', new Date())