// /*
Higher-Order Components
A higher-order component (HOC) is an advanced technique in React 
for reusing component logic. HOCs are not part of the React API, per se. 
They are a pattern that emerges from React’s compositional nature.

Concretely, a higher-order component is a function that takes a component 
and returns a new component.

const EnhancedComponent = higherOrderComponent(WrappedComponent);

Whereas a component transforms props into UI, a higher-order component 
transforms a component into another component.

HOCs are common in third-party React libraries, such as Redux’s connect 
and Relay’s createFragmentContainer.


Use HOCs For Cross-Cutting Concerns

Note
We previously recommended mixins as a way to handle cross-cutting concerns. 
We’ve since realized that mixins create more trouble than they are worth.

Components are the primary unit of code reuse in React. However, you’ll 
find that some patterns aren’t a straightforward fit for traditional components.

For example, say you have a CommentList component that subscribes 
to an external data source to render a list of comments:

const CommentList = () => {

          // "DataSource" is some global data source
          const [comments, setComments] = useState(DataSource.getComments())
          
          const handleChange = () => {
                    // Update component state whenever the data source changes
                    setComments(DataSource.getComments());
          }

          useEffect(() => {
                    // Subscribe to changes
                    DataSource.addChangeListener(handleChange);

          }, []) 


          useEffect(() => {
                    // Clean up listener
                    DataSource.removeChangeListener(handleChange);

          }, []) 


          return (
                    <div>
                              {
                                        comments.map((comment) => (
                                                  <Comment comment={comment} key={comment.id} />
                                        ))
                              }
                    </div>
          );
}

Later, you write a component for subscribing to a single blog post, 
which follows a similar pattern:

function BlogPost(props) {
          const [blogPost, setBlogPost] = useState(DataSource.getBlogPost(props.id))
          
          const handleChange = () => {
                    setBlogPost(DataSource.getBlogPost(props.id));
          }

          useEffect(() => {
                    DataSource.addChangeListener(handleChange);
          }, [])

          useEffect(() => {
                    DataSource.removeChangeListener(handleChange);
          }, [])


          return <TextBlock text={blogPost} />;
}

CommentList and BlogPost aren’t identical — they call different 
methods on DataSource, and they render different output. But much 
of their implementation is the same:

On mount, add a change listener to DataSource.
Inside the listener, call setState whenever the data source changes.

On unmount, remove the change listener.
You can imagine that in a large app, this same pattern of subscribing 
to DataSource and calling setState will occur over and over again. 
We want an abstraction that allows us to define this logic in a single 
place and share it across many components. This is where higher-order 
components excel.

We can write a function that creates components, like CommentList 
and BlogPost, that subscribe to DataSource. The function will accept 
as one of its arguments a child component that receives the subscribed 
data as a prop. Let’s call the function withSubscription:

const CommentListWithSubscription = withSubscription( 
          CommentList, (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
          BlogPost, (DataSource, props) => DataSource.getBlogPost(props.id)
);

The first parameter is the wrapped component. The second parameter 
retrieves the data we’re interested in, given a DataSource and the current props.

When CommentListWithSubscription and BlogPostWithSubscription are rendered, 
CommentList and BlogPost will be passed a data prop with the most current data 
retrieved from DataSource:

// This function takes a component...
function withSubscription(WrappedComponent, selectData) {
          // ...and returns another component...
          return function(props) {

                    const [data, setData] = useState(selectData(DataSource, props))
                    
                    const handleChange = () => {
                              setData(selectData(DataSource, props));
                    }

                    useEffect(() => {
                              // ... that takes care of the subscription...
                              DataSource.addChangeListener(handleChange);
                    }, [])
                    

                    useEffect(() => {
                              DataSource.removeChangeListener(handleChange);

                    }, [])

                    // ... and renders the wrapped component with the fresh data!
                    // Notice that we pass through any additional props
                    return <WrappedComponent data={data} {...props} />;
          };
}

Note that a HOC doesn’t modify the input component, nor does it use 
inheritance to copy its behavior. Rather, a HOC composes the original 
component by wrapping it in a container component. A HOC is a pure 
function with zero side-effects.

And that’s it! The wrapped component receives all the props of the 
container, along with a new prop, data, which it uses to render its output. 
The HOC isn’t concerned with how or why the data is used, and the 
wrapped component isn’t concerned with where the data came from.

Because withSubscription is a normal function, you can add as many 
or as few arguments as you like. For example, you may want to make 
the name of the data prop configurable, to further isolate the HOC from 
the wrapped component. 

Like components, the contract between withSubscription and the wrapped 
component is entirely props-based. This makes it easy to swap one HOC 
for a different one, as long as they provide the same props to the wrapped 
component. This may be useful if you change data-fetching libraries, 
for example.


Don’t Mutate the Original Component. Use Composition.
Resist the temptation to modify a component’s prototype (or otherwise 
mutate it) inside a HOC.

function logProps(InputComponent) {
          InputComponent.prototype.componentDidUpdate = function(prevProps) {
                    console.log('Current props: ', this.props);
                    console.log('Previous props: ', prevProps);
          };
          // The fact that we're returning the original input is a hint that it has
          // been mutated.
          return InputComponent;
}

// EnhancedComponent will log whenever props are received
const EnhancedComponent = logProps(InputComponent);


Instead of mutation, HOCs should use composition, by wrapping 
the input component in a container component:

function logProps(WrappedComponent) {
          return class extends React.Component {
                    componentDidUpdate(prevProps) {
                              console.log('Current props: ', this.props);
                              console.log('Previous props: ', prevProps);
                    }

                    render() {
                              // Wraps the input component in a container, without mutating it. Good!
                              return <WrappedComponent {...this.props} />;
                    }
          }
}


Convention: Wrap the Display Name for Easy Debugging
The container components created by HOCs show up in the React Developer 
Tools like any other component. To ease debugging, choose a display name 
that communicates that it’s the result of a HOC.

Don’t Use HOCs Inside the render Method




// */