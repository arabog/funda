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






*/