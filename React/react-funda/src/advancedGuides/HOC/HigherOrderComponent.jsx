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






// */