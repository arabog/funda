// /*
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

// */