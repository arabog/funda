/*
Lists and Keys
First, let’s review how you transform lists in JavaScript.

Given the code below, we use the map() function to take 
an array of numbers and double their values. We assign 
the new array returned by map() to the variable doubled 
and log it:

const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((number) => number * 2);

console.log(doubled);
This code logs [2, 4, 6, 8, 10] to the console.

Rendering Multiple Components
You can build collections of elements and include them in 
JSX using curly braces {}.

Below, we loop through the numbers array using the JavaScript 
map() function. We return a <li> element for each item. Finally, 
we assign the resulting array of elements to listItems:

const numbers = [1, 2, 3, 4, 5];

const listItems = numbers.map((number) =>
          <li>{number}</li>
);







*/ 