/*
Exploring Different Rendering Strategies
When talking about rendering strategies, we refer to 
how we serve a web page (or a web application) to 
a web browser.

Well, Next.js does the same thing by dynamically rendering 
an HTML page on the server for each request, then sending 
it to the web browser. The framework will also inject its
own scripts to make the server-side rendered pages dynamic 
in a process called hydration.

Navigating between server-side rendered pages will always 
be a bit slower than navigating between client-side rendered 
or statically served pages.

Using dynamic component loading
As we saw in the first chapter, Next.js extends React 
functionalities by adding some great built-in components 
and utility functions. One of these is called dynamic , and 
it's one of the most interesting modules provided by the 
framework.

Remember the Highlight.js component that we built to 
understand how to render a component on the browser 
using the React.useEffect hook? Here is another way to
render it using the Next.js dynamic function:

import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css';

const Highlight = dynamic(
          () => import('../components/Highlight'),
          { ssr: false }
);


function DynamicPage() {
          return (
                    <div className={styles.main}>
                              <Highlight
                                        code={"console.log('Hello, world!')"}
                                        language='js'
                              />
                    </div>
          );
}

export default DynamicPage;

With the preceding code, we're importing our Highlight 
component via dynamic imports, specifying that we want 
it to be executed on the client only thanks to the ssr:false 
option. That way, Next.js won't try to render that component 
on the server and we'll have to wait for React hydration to 
make it available on the browser.

CSR can be a fantastic alternative to SSR for building very 
dynamic web pages. If you're working on a page that doesn't 
need to be indexed by search engines, it could make sense to 
first load your application's JavaScript, and then, from the 
client side, fetch any necessary data from the server; this 
would lighten the server-side workload since this approach 
does not involve SSR and your application could scale better.

*/ 