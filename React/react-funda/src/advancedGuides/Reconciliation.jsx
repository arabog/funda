/*
Reconciliation
React provides a declarative API so that you don’t have to worry 
about exactly what changes on every update. This makes writing 
applications a lot easier, but it might not be obvious how this is 
implemented within React. This article explains the choices we 
made in React’s “diffing” algorithm so that component updates are 
predictable while being fast enough for high-performance apps.

When updating style, React also knows to update only the properties 
that changed. For example:

<div style={{color: 'red', fontWeight: 'bold'}} />

<div style={{color: 'green', fontWeight: 'bold'}} />

When converting between these two elements, React knows to only 
modify the color style, not the fontWeight.

Recursing On Children
By default, when recursing on the children of a DOM node, React just 
iterates over both lists of children at the same time and generates a 
mutation whenever there’s a difference.

For example, when adding an element at the end of the children, 
converting between these two trees works well:

<ul>
          <li>first</li>
          <li>second</li>
</ul>

<ul>
          <li>first</li>
          <li>second</li>
          <li>third</li>
</ul>

React will match the two <li>first</li> trees, match the two <li>second</li> 
trees, and then insert the <li>third</li> tree.

If you implement it naively, inserting an element at the beginning has worse 
performance. For example, converting between these two trees works poorly:

<ul>
          <li>Duke</li>
          <li>Villanova</li>
</ul>

<ul>
          <li>Connecticut</li>
          <li>Duke</li>
          <li>Villanova</li>
</ul>

React will mutate every child instead of realizing it can keep the 
<li>Duke</li> and <li>Villanova</li> subtrees intact. This 
inefficiency can be a problem.

Keys
In order to solve this issue, React supports a key attribute. When children 
have keys, React uses the key to match children in the original tree with 
children in the subsequent tree. For example, adding a key to our inefficient 
example above can make the tree conversion efficient:

<ul>
          <li key="2015">Duke</li>
          <li key="2016">Villanova</li>
</ul>

<ul>
          <li key="2014">Connecticut</li>
          <li key="2015">Duke</li>
          <li key="2016">Villanova</li>
</ul>

Now React knows that the element with key '2014' is the new one, and the 
elements with the keys '2015' and '2016' have just moved.

In practice, finding a key is usually not hard. The element you are going 
to display may already have a unique ID, so the key can just come from 
your data:

<li key={item.id}>{item.name}</li>

When that’s not the case, you can add a new ID property to your model or 
hash some parts of the content to generate a key. The key only has to be 
unique among its siblings, not globally unique.

As a last resort, you can pass an item’s index in the array as a key. This 
can work well if the items are never reordered, but reorders will be slow.










*/