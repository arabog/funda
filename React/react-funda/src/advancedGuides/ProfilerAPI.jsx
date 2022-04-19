/*
Profiler API
The Profiler measures how often a React application renders and 
what the “cost” of rendering is. Its purpose is to help identify parts 
of an application that are slow and may benefit from optimizations 
such as memoization.

Note:
Profiling adds some additional overhead, so it is disabled in the 
production build.


-: Usage
A Profiler can be added anywhere in a React tree to measure the cost 
of rendering that part of the tree. It requires two props: an id (string) 
and an onRender callback (function) which React calls any time a 
component within the tree “commits” an update.

For example, to profile a Navigation component and its descendants:

render(
          <App>
                    <Profiler id="Navigation" onRender={callback}>
                              <Navigation {...props} />
                    </Profiler>

                    <Main {...props} />
          </App>
);

Multiple Profiler components can be used to measure different parts of an application:

render(
          <App>
                    <Profiler id="Navigation" onRender={callback}>
                              <Navigation {...props} />
                    </Profiler>

                    <Profiler id="Main" onRender={callback}>
                              <Main {...props} />
                    </Profiler>
          </App>
);

Profiler components can also be nested to measure different 
components within the same subtree:

render(
          <App>
                    <Profiler id="Panel" onRender={callback}>
                              <Panel {...props}>
                                        <Profiler id="Content" onRender={callback}>
                                                  <Content {...props} />
                                        </Profiler>

                                        <Profiler id="PreviewPane" onRender={callback}>
                                                  <PreviewPane {...props} />
                                        </Profiler>
                              </Panel>
                    </Profiler>
          </App>
);
Note

Although Profiler is a light-weight component, it should be used only 
when necessary; each use adds some CPU and memory overhead to 
an application.



*/