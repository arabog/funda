/*
Fragments
A common pattern in React is for a component to return multiple elements. 
Fragments let you group a list of children without adding extra nodes to the DOM.

return (
          <React.Fragment>
                    <ChildA />
                    <ChildB />
                    <ChildC />
          </React.Fragment>
);

There is also a new short syntax for declaring them.

return (
          <>
                    <td>Hello</td>
                    <td>World</td>
          </>
);

You can use <></> the same way you’d use any other element except 
that it doesn’t support keys or attributes.


Motivation
A common pattern is for a component to return a list of children. 
Take this example React snippet:


import React from 'react'

function Table() {
          return (
                    <table>
                              <tr>
                                        <Columns />
                              </tr>
                    </table>
          );
}



<Columns /> would need to return multiple <td> elements in order 
for the rendered HTML to be valid. If a parent div was used inside 
the return() of <Columns />, then the resulting HTML will be invalid. 


const Columns = () => {
          return (
                    <div>
                              <td>Hello</td>
                              <td>World</td>
                    </div>
          );
}

export default Table;

results in a <Table /> output of:

<table>
          <tr>
                    <div>
                              <td>Hello</td>
                              <td>World</td>
                    </div>
          </tr>
</table>

Fragments solve this problem.

Usage
const Columns = () =>  {
          return (
                    <React.Fragment>
                              <td>Hello</td>
                              <td>World</td>
                    </React.Fragment>
          );
}

export default Table;

which results in a correct <Table /> output of:

<table>
          <tr>
                    <td>Hello</td>
                    <td>World</td>
          </tr>
</table>


Keyed Fragments
Fragments declared with the explicit <React.Fragment> syntax 
may have keys. A use case for this is mapping a collection to an 
array of fragments — for example, to create a description list:

function Glossary(props) {
          return (
                    <dl>
                              {
                                        props.items.map(item => (
                                                  // Without the `key`, React will fire a key warning
                                                  <React.Fragment key={item.id}>
                                                            <dt>{item.term}</dt>
                                                            <dd>{item.description}</dd>
                                                  </React.Fragment>
                                        ))
                              }
                    </dl>
          );
}

key is the only attribute that can be passed to Fragment. In the future, 
we may add support for additional attributes, such as event handlers.

*/