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

-: Next.js' automatic image optimization
Using standard HTML tags, we could just do the following:
<img
          src=' https://images.unsplash.com/photo-1605460375648-
          278bcbd579a6'
          alt='A beautiful English Setter'
/>

However, we may also want to use the srcset property for responsive 
images, so we'll actually need to optimize the picture for different 
screen resolutions, which involves some extra steps for serving our 
assets.

Next.js makes it very easy by just configuring the next.config.js file 
and using the Image component. We just said that we want to serve 
images coming from Unsplash, so let's add that service hostname 
to our next.config.js file, under the images property:

module.exports = {
          images: {
                    domains: ['images.unsplash.com']
          }
};

That way, every time we use an image coming from that hostname 
inside an Image component, Next.js will automatically optimize it 
for us. Now, let's try to import that image inside a page:

import Image from 'next/image';

function IndexPage() {
          return (
                    <div>
                              <Image
                                        src=' https://images.unsplash.com/photo-1605460375648-278bcbd579a6'
                                        width={500}
                                        height={200}
                                        alt='A beautiful English Setter'
                              />
                    </div>
          );
}

export default IndexPage;

We can crop our image to fit the desired dimensions using the 
optional layout prop. It accepts four different values: fixed , 
intrinsic , responsive , and fill . Let's look at these in more detail:

• fixed works just like the img HTML tag. If we change the 
viewport size, it will keep the same size, meaning that it won't 
provide a responsive image for smaller (or bigger) screens.

• responsive works in the opposite way to fixed ; as we resize 
our viewport, it will serve differently optimized images for our 
screen size.

• intrinsic is halfway between fixed and responsive ; it will 
serve different image sizes as we resize down our viewport, 
but it will leave the largest image untouched on bigger screens.

• fill will stretch the image according to its parent element's 
width and height; however, we can't use fill alongside the 
width and height props. You can use fill or width and height ).

So now, if we want to fix our English Setter image to display it 
properly on our screen, we can refactor our Image component 
as follows:

import Image from "next/image";


function Homepage() {
	return (
		<div style={{width: 500, height: 200, position: 'relative'}}>
			<Image 
				src=' https://images.unsplash.com/photo-1605460375648-278bcbd579a6'
				
				// width={500}	
				// height={200}
				layout="fill"
				objectFit="cover"
				alt= 'A beautiful English Setter'
			/>

			This is the homepage
		</div>
	)
} 

export default Homepage;

As you can see, we wrapped the Image component with a 
fixed size div and the CSS position property set to relative . 
We also removed both the width and height props from our 
Image component, as it will stretch following its parent 
div sizes.We also added the objectFit prop set to cover so 
that it will crop the image according to its parent div size, 
and that's the final result.

If we now try to inspect the resulting HTML on the browser, 
we will see that the Image component generated many 
different image sizes, which will be served using the 
srcset property of a standard img HTML tag:


-: Running automatic image optimization on external services
By default, automatic image optimization runs on the same 
server as Next.js. Of course, if you're running your website 
on a small server with low resources, this could potentially
affect its performance. For that reason, Next.js allows you 
to run automatic image optimization on external services 
by setting the loader option inside your next. config.js file:

module.exports = {
          images: {
                    loader: 'akamai',
                    domains: ['images.unsplash.com']
          }
};

If you're deploying your web app to Vercel, you don't actually \
need to set up any loader in your next.config.js file as Vercel 
will take care of optimizing and serving the image files for you. 
Otherwise, you can use the following external services:
• Akamai: https://www.akamai.com
• Imgix: https://www.imgix.com
• Cloudinary: https://cloudinary.com

If you don't want to use any of these services, or you want 
to use your custom image optimization server, you can use 
the loader prop directly inside your component:

import Image from 'next/image'

const loader = ({src, width, quality}) => {
          return `https://example.com/${src}?w=${width}&q=${quality|| 75}`
}

function CustomImage() {
          return (
                    <Image
                              loader={loader}
                              src="/myimage.png"
                              alt="My image alt text"
                              width={350}
                              height={540}
                    />
          )
}

This way, you'll be able to serve images coming from 
any external service

Important Note
Before creating a custom loader, read the documentation of 
your image optimization server.


-: Handling metadata
So far, we haven't yet talked about how to set open graph 
data, HTML titles, or HTML meta tags dynamically. While 
a website could technically work even without that data,
search engines would penalize your pages, as they would 
miss important information.

The user experience could also be negatively affected as 
these meta tags would help the browser create an optimized 
experience for our users.

We can start with one of the most common dynamic parts of 
our metadata: the HTML <title> tag. Let's set up a new 
Next.js project and then create two new pages.
The first page we will create is index.js :

import Head from 'next/head';
import Link from 'next/link';

function IndexPage() {
          return (
                    <>
                              <Head>
                                        <title> Welcome to my Next.js website </title>
                              </Head>

                              <div>
                                        <Link href='/about' passHref>
                                                  <a>About us</a>
                                        </Link>
                              </div>
                    </>
          );
}


export default IndexPage;

The second page is about.js :
import Head from 'next/head';
import Link from 'next/link';
function AboutPage() {
          return (
                    <>
                              <Head>
                                        <title> About this website </title>
                              </Head>

                              <div>
                                        <Link href='/'passHref>
                                                  <a>Back to home</a>
                                        </Link>
                              </div>
                    </>
          );
}

export default AboutPage;

Running the server, you will be able to navigate 
between those two pages and see that the <title> 
content changes depending on the route you're visiting.

Now, let's make things a bit more complex. We want to 
create a new component that only displays a button. Once 
we click on it, our page title will change depending on the
page we're currently on; we can always roll back to the 
original title by clicking on the button again.

import { useState } from 'react'
import Head  from 'next/head'

function Widget({pageName}) {
          const [active, setActive] = useState(false);

          if(active) {
                    return (
                              <>
                                        <Head> <title> You're browsing the {pageName} page </title> </Head>

                                        <div>
                                                  <button onClick={() => setActive(false)} > 
                                                            Restore original title
                                                  </button>          

                                                  Take a look at the title!
                                        </div>                    
                              </>
                    )
          }

          return (
                    <>
                              <button onClick={() => setActive(true)}>
                                        Change page title
                              </button>
                    </>
          )
}


export default Widget

We'll start by opening the index.js file and importing the 
Widget component and then we're going to render it inside 
a new <div> :

So far, we've seen how to handle metadata inside our pages 
and components, but there are cases where you want to use 
the same meta tags on different components. In those cases,
you may not want to rewrite all the metadata from scratch for 
each component, so here comes the concept of grouping 
metadata by creating a whole component just for handling
that kind of HTML tag.


-: Grouping common meta tags
Let's say that we want to add a blog section to our website. 
We may want to add support for open graph data, Twitter cards, 
and other metadata for our blog posts, so we could easily group 
all this common data inside a PostHead component. Let's create 
a new file, components/PostHead.js , and add the following script

import Head from "next/head";


function PostMeta(props) {
          return (
                    <Head>
                              <title> { props.title } </title>
                              <meta name="description" content={props.subtitle} />

                              open-graph meta 
                              <meta property="og:title" content={props.title} />
                              <meta property="og:description" content={props.subtitle} />
                              <meta property="og:image" content={props.image} />

                              twitter card meta 
                              <meta name="twitter:card" content="summary" />
                              <meta name="twitter:title" content={props.title} />
                              <meta name="twitter:description" content={props.description} />
                              <meta name="twitter:image" content={props.image} />
                    </Head>
          )
}

export default PostMeta;

Now, let's create a mock for our posts. We will create a new folder 
called data and a file called posts.js inside it:

export default [
          {
                    id: 'qWD3Pzce',
                    slug: 'dog-of-the-day-the-english-setter',
                    title: 'Dog of the day: the English Setter',
                    subtitle: 'The English Setter dog breed was namedfor these dogs\' practice of "setting", or crouching low, when they found birds so hunters could throw their nets over them',
                    image: 'https://images.unsplash.com/photo-1605460375648-278bcbd579a6'
          },

          {
                    id: 'yI6BK404',
                    slug: 'about-rottweiler',
                    title: 'About Rottweiler',
                    subtitle: "The Rottweiler is a breed of domestic dog, regarded as medium-to-large or large. The dogs were known in German as Rottweiler Metzgerhund, meaning Rottweil butchers' dogs, because their main use was to herd livestock and pull carts laden with butchered meat to market",
                    image: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379'
          },

          {
                    id: 'VFOyZVyH',
                    slug: 'running-free-with-collies',
                    title: 'Running free with Collies',
                    subtitle: 'Collies form a distinctive type of herding dogs, including many related landraces and standardized breeds. The type originated in Scotland and Northern England. Collies are medium-sized, fairly lightly-built dogs, with pointed snouts. Many types have a distinctive white color over the shoulders',
                    image: 'https://images.unsplash.com/photo-1517662613602-4b8e02886677'
          }
]

Great! Now we only need to create a [slug] page to display our posts. 
The full route will be /blog/[slug] , so let's create a new file called 
[slug].js inside pages/blog/ and add the following content:

import PostHead from '../../components/PostHead'
import posts from '../../data/posts'


export function getServerSideProps({params}) {
          const { slug } = params;

          const post = posts.find(p => p.slug === slug);

          return {
                    props: {post}
          }
}


function Post({post}) {
          return (
                    <div>
                              <PostHead {...post} />

                              <h1> {post.title} </h1>
                              <p> {post.subtitle} </p>
                    </div>
          )
}

export default Post;

This approach is not mandatory, but it allows you to 
logically separate head-related components from other 
components, leading to a more organized code base.



cont on pg 74
*/ 