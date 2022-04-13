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

Motivation
A common pattern is for a component to return a list of children. 
Take this example React snippet:

*/

function Table() {
          return (
                    <table>
                              <tr>
                                        <Columns />
                              </tr>
                    </table>
          );
}



{/* <Columns /> would need to return multiple <td> elements in order 
for the rendered HTML to be valid. If a parent div was used inside 
the render() of <Columns />, then the resulting HTML will be invalid. */}

const Columns = () => {
          return (
                    <div>
                              <td>Hello</td>
                              <td>World</td>
                    </div>
          );
}

export default Table;

// */