/*
We will also take a closer look at the _app.js and 
_document.js pages, which will allow us to customize 
our web app behavior in several ways.

-: Routing system
To make things a bit clearer, let's say that we want to create 
a simple website with just two pages; the first one will be the 
home page, while the second one will be a simple contact
page. To do that, we will only need to create two new files 
inside our pages/ folder: index.js and contacts.js . Both files 
will need to export a function returning some JSX content; it 
will be rendered on the server side and sent to the browser as
standard HTML.

As we've just seen, a page must return valid JSX code, so let's 
make a very simple and concise index.js page:

function Homepage() {
          return (
                    <div> This is the homepage </div>
          )
};

export default Homepage;

We can do the same with our contact page:
function ContactPage() {
          
          return (
                    <div>
                              <ul>
                                        <li> Email: myemail@example.com</li>
                                        <li> Twitter: @myusername </li>
                                        <li> Instagram: myusername </li>
                              </ul>
                    </div>
          )
};

export default ContactPage;

Given that we've called our contact page contacts.js , 
we can navigate to http://localhost:3000/contacts and 
see the contacts list displayed on the browser.

Now, let's try to make things a bit harder. We're building 
a blog, so we want to create a route for each post. We also 
want to create a /posts page that will show every post
present on the website.

To do that, we will use a dynamic route as follows:

pages/
          - index.js
          - contact-us.js
          - posts/
                    - index.js
                    - [slug].js

We haven't mentioned yet that we can create nested routes 
using folders inside our pages/ directory. If we want to make 
a /posts route, we can create a new index.js file inside the 
pages/posts/ folder, export a function containing some JSX 
code, and visit http://localhost:3000/posts .

We then want to create a dynamic route for every blog post 
so that we don't have to manually create a new page every 
time we want to publish an article on our website. To do 
that, we can create a new file inside the pages/posts/ folder, 
pages/posts/[slug].js , where [slug] identifies a route variable 
that can contain any value, depending on what the user types 
in the browser's address bar.

In that case, we're creating a route containing a variable called 
slug , which can vary for every blog post.

We can also nest multiple dynamic routes inside the pages/ 
folder; let's say that we want our post page structure to be 
as follows: /posts/[date]/[slug] . We can just add a new folder 
called [date] inside our pages/ directory and move the slug.js 
file inside it:

pages/
          - index.js
          - contact-us.js
          - posts/
                    - index.js
                    - [date]/
                              - [slug].js

Once again, both the [date] and [slug] variables can 
represent whatever you want, so feel free to experiment 
by calling different routes on the browser.


-: Using route variables inside our pages
Let's take an easy example: a greetings page. Inside the 
project used in the previous section, let's create the following 
file: pages/greet/[name].js . We're going to use Next.js' 
built-in getServerSideProps function to dynamically get 
the [name] variable from the URL and greet the user:

export async function getServerSideProps({params}) {
          const { name } = params;

          return {
                    props: { name }
          }
}


function Greet(props) {
          return (
                    <h1> Hello, {props.name}! </h1>
          )
}

export default Greet;

Now, open your favorite browser and go to http://localhost:3000/greet/
Mitch ; you should see a "Hello, Mitch!" message appear on the screen.

Important Note
When using both the getServerSideProps and getStaticProps
functions, remember that they must return an object. Also, if 
you want to pass any prop from one of those two functions to 
your page, make sure to pass them inside the returning object's 
props property.


-: Using route variables inside components
In the previous section, we have learned how to use route 
variables inside our pages. Next.js does not allow us to use 
both getServerSideProps and getStaticProps functions outside 
of our pages, so how are we supposed to use them inside other 
components?

Next.js makes this effortless thanks to the useRouter hook; we 
can import it from the next/router file:

import { useRouter } from 'next/router';

Let's refactor the previous greetings page as follows:

import { useRouter } from "next/router";

function Greet() {
          const { query } = useRouter();

          return (
                    <h1> Hello, {query.name}! </h1>
          )
}

export default Greet;

We can observe how Next.js passes both route variables 
and query strings via the useRouter hook by trying to 
append any query parameter to our URL and log the
query variable inside our component:


import { useRouter } from "next/router";

function Greet() {
          const { query } = useRouter();

          console.log(query)

          return (
                    <h1> Hello, {query.name}! </h1>
          )
}

export default Greet;

If we now try to call the following URL, http://localhost:3000/greet/
Mitch?learning_nextjs=true , we will see the following object 
logged inside our terminal:

{learning_nextjs: "true", name: "Mitch"}

Important Note
Next.js does not throw any error if you try to append a 
query parameter with the same key as your routing variable. 
You can easily try that by calling the following URL: 
http://localhost:3000/greet/Mitch?name=Christine . You 
will notice that Next.js will give precedence to your route 
variable, such that you will see Hello, Mitch! displayed 
on the page.

-: Client-side navigation
In fact, it supports the HTML standard <a> tags for linking 
pages, but it also provides a more optimized way for navigating 
between different routes: the Link component.

We can import it as a standard React component and use it 
for linking different pages or sections of our website. Let's 
look at an easy example:

import Link from 'next/link';

function Navbar() {
          return (
                    <div>
                              <Link href='/about'>Home</Link>
                              <Link href='/about'>About</Link>
                              <Link href='/about'>Contacts</Link>
                    </div>
          );
}

export default Navbar;

By default, Next.js will preload every single Link found 
on the viewport, meaning that once we click on one of 
the links, the browser will already have all the data 
needed to render the page.

You can disable this feature by passing the preload={false} 
prop to the Link component:

import Link from 'next/link';
function Navbar() {
          return (
                    <div>
                              <Link href='/about' preload={false}>Home</Link>
                              <Link href='/about' preload={false}>About</Link>
                              <Link href='/about' preload={false}>Contacts</Link>
                    </div>
          );
}

export default Navbar;

If we are building complex URLs, we can also pass an object 
to the href prop:
<Link
          href={{
                    pathname: '/blog/[date]/[slug]'
                    query: {
                              date: '2020-01-01',
                              slug: 'happy-new-year',
                              foo: 'bar'
                    }
          }}
/>
          Read post
</Link>

Once the user clicks that link, Next.js will redirect the 
browser to the following URL:
http://localhost:3000/blog/2020-01-01/happy-new-year?foo=bar .



-: Using the router.push method
Using the router.push method
There is another way to move between your Next.js website pages: 
by using the useRouter hook.

Let's pretend that we want to give access to a given page only to 
logged-in users, and we already have a useAuth hook for that. 
We can use the useRouter hook to dynamically redirect a user if, 
in this case, they're not logged in:

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import PrivateComponent from '../components/Private';
import useAuth from '../hooks/auth';

function MyPage() {
          const router = useRouter();
          const { loggedIn } = useAuth();

          useEffect(() => {
                    if (!loggedIn) {
                              router.push('/login')
                    }
          }, [loggedIn]);

          return loggedIn ? <PrivateComponent /> : null;
}

export default MyPage;

As you can see, we're using the useEffect hook to run the 
code on the client side only.

In that case, if the user isn't logged in, we use the router.push 
method to redirect them to the login page.

Just like with the Link component, we can create more 
complex page routes by passing an object to the push method:

router.push({
          pathname: '/blog/[date]/[slug]',

          query: {
                    date: '2021-01-01',
                    slug: 'happy-new-year',
                    foo: 'bar'
          }
});

Once the router.push function has been called, the browser 
will be redirected to
http://localhost:3000/blog/2020-01-01/happy-new-year?foo=bar .


Serving static assets
Using the term static asset, we refer to all of those non-dynamic 
files, such as images, fonts, icons, compiled CSS, and JS files.
The easiest way to serve those assets is by using the default /public 
folder provided by Next.js. In fact, every file inside this folder will 
be considered and served as a static asset.







stop at pg 53
*/ 