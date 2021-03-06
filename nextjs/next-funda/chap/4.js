/*
Organizing the Code Base and Fetching Data in Next.js
In this chapter, we will first see how to organize our folder 
structure

As soon as we implement new features, we will need to 
add new components, utilities, styles, and pages.

Organizing the folder structure
As we've already seen, Next.js forces you to place some 
files and folders in particular locations of your code base 
(think of _app.js and _documents.js files, the pages/ and 
public/ directories, and so on), but it also provides a way 
to customize their placement inside your project repository.

We've already seen that, but let's do a quick recap on a 
default Next.js folder structure: 
next-js-app
          - node_modules/
          - package.json
          - pages/
          - public/
          - styles/

• pages/ : The directory where we place our pages and 
build the routing system for our web app
• public/ : The directory where we place files to be served 
as static assets (compiled CSS and JavaScript files, images, 
and icons)
• styles/ : The directory where we place our styling modules, 
regardless of their format (CSS, SASS, LESS)

From here, we can start customizing our repository structure 
to make it easier to navigate through. The first thing to know 
is that Next.js allows us to move our pages/ directory inside 
an src/ folder. We can also move all the other directories 
(except for the public/ and node_modules , of course) 
inside src/ , making our root directory a bit tidier.


-: Organizing the components
As for now, we will only discuss a folder structure that can 
help us write and find configuration files, components, tests, 
and styles with ease.

We have different ways of setting up our folder structure. 
We can start by separating components into three different 
categories and then putting styles and tests in the same folder 
for each component.

To do that, create a new components/ folder inside our root 
directory. Then, by moving inside it, create the following folders:
mkdir components && cd components
mkdir atoms
mkdir molecules
mkdir organisms
mkdir templates

As you may have noticed, we're following the atomic design 
principle, where we want to divide our components into 
different levels so as to organize our code base better. This
is just a popular convention, and you're free to follow any 
other approach for organizing your code.

We will divide our components into four categories:
• atoms : These are the most basic components that we 
will ever write in our code base. Sometimes, they act 
as a wrapper for standard HTML elements such as button , 
input , and p , but we can also add animations, color palettes, 
and so on, to this category of components.

• molecules : These are a small group of atoms combined 
to create slightly more complex structures with a minimum 
of utility. The input atom and the label atom together can be 
a straightforward example of what a molecule is.

• organisms : Molecules and atoms combine to create 
complex structures, such as a registration form, a footer, 
and a carousel.

• templates : We can think of templates as the skeleton of 
our pages. Here, we decide where to put organisms, atoms, 
and molecules together to create the final page that the 
user will browse.

If you're interested in learning more about atomic design, here's 
a good article explaining it in detail: 
https://bradfrost.com/blog/post/atomic-web-design .

what is atomic design
Atomic design is methodology for creating design systems. 
There are five distinct levels in atomic design:
          Atoms
          Molecules
          Organisms
          Templates
          Pages

Now, let's pretend that we want to create a Button component. 
When we create a new component, we often need at least three 
different files: the component itself, its style, and a test file. 
We can create those files by moving inside components/atoms/ 
and then creating a new folder called Button/ . Once we create 
this folder, we can move on to creating the components' files:
          cd components/atoms/Button
          touch index.js
          touch button.test.js
          touch button.styled.js # or style.module.css

Organizing our components that way will help us a lot when we 
need to search, update, or fix a given component. Let's say that 
we spot a bug in production that involves our Button component. 
We can easily find the component inside our code base, find its 
test and styling files, and fix them.

Organizing utilities
There are specific files that don't export any component; they're just 
modular scripts used for many different purposes. We're talking here 
about the utility scripts.

Let's pretend that we have several components whose purpose is to 
check whether a particular hour of the day has passed to display 
certain information. It wouldn't make any sense to write the same 
function inside every component. We can therefore write a generic
utility function and then import it inside every component that 
needs that kind of feature.


-: Organizing static assets
Next.js makes it easy to serve static files, as you only
need to put them inside the public/ folder, and the 
framework will do the rest.

Moving inside our public/ folder, we can create a new 
directory called assets/ :

cd public && mkdir assets

And inside that newly created directory, we will be creating 
a new folder for each type of static asset:
          cd assets
          mkdir js
          mkdir css
          mkdir icons
          mkdir images

The icons/ directory will primarily be used to serve our 
web app manifest icons. The web app manifest is a JSON 
file that includes some useful information about the progressive
web app that you're building, such as the app name and the 
icons to use when installing it on a mobile device.

We can easily create this manifest file by entering the 
public/ folder and adding a new file called manifest.json :
cd public/ && touch manifest.json

At this point, we can fill the JSON file with some basic 
information. Let's take the following JSON as an example:
{
          "name": "My Next.js App",
          "short_name": "Next.js App",
          "description": "A test app made with next.js",
          "background_color": "#a600ff",
          "display": "standalone",
          "theme_color": "#a600ff",

          "icons": [
                    {
                              "src": "/assets/icons/icon-192.png",
                              "type": "image/png",
                              "sizes": "192x192"
                    },
                    
                    {
                              "src": "/assets/icons/icon-512.png",
                              "type": "image/png",
                              "sizes": "512x512"
                    }
          ]
}

We can include that file using an HTML meta tag
<link rel="manifest" href="/manifest.json">

That way, users browsing your Next.js app from a mobile 
device will be able to install it on their smartphones or tablets.


-: Organizing styles
Style organization can really depend on the stack you want 
to use to style your Next.js application.
Starting from CSSinJS frameworks such as Emotion, 
styled-components, JSS, and similar ones, one common 
approach is to create a specific styling file for each component; 
that way, it will be easier for us to find a particular component 
style inside our code base when we need to make some changes.
However, even though separating styling files depending on their 
respective components can help us keep our code base organized, 
we may need to create some common styles or utility files, such as 
color palettes, themes, and media queries.

In that case, it can be useful to reuse the default styles/ directory 
shipped with a default Next.js installation. We can put our common 
styles inside that folder and import them inside other styling files 
only when we need them.


-: Lib files
When talking about lib files, we refer to scripts that explicitly 
wrap third-party libraries as lib files. While the utility scripts 
are very generic and can be used by many different
components and libraries, the lib files are specific for a ce

If we try to visualize the folder structure for the preceding example, we will end up with
the following schema:
next-js-app
          - lib/
                    - graphql/
                              - index.js
                              - queries/
                                        - query1.js
                                        - query2.js
                              - mutations/
                                        - mutation1.js
                                        - mutation2.js


-: Data fetching
Next.js allows us to fetch data on both the client and 
server sides. Server-side data fetching could happen 
in two different moments: at build time (using 
getStaticProps for static pages), and at runtime (using
getServerSideProps for server-side rendered pages).

Even if it's technically possible for Next.js to access
a database and query for specific data, I'd personally 
discourage that approach as Next.js should only care 
about the frontend of our application


-: Fetching data on the server side
Next.js allows us to fetch data on the server side by 
using its built-in getStaticProps and getServerSideProps 
functions.

Given that Node.js doesn't support JavaScript fetch APIs 
like browsers do, we have two options for making HTTP 
requests on the server:

1. Using the Node.js' built-in http library: We can use this 
module without installing any external dependency
2. Using HTTP client libraries: There are several great 
HTTP clients for Next.js, making it really straightforward 
to make HTTP requests from the server. Axios (a very 
popular HTTP client that runs both on client and server 
with the same APIs).


-; Consuming REST APIs on the server side
When discussing the integration of REST APIs, we need to 
divide them into public and private APIs. The public ones 
are accessible by anyone without any kind of authorization,
and the private ones always need to be authorized to return 
some data.

There may be other ways in which to authorize your requests, 
but Oauth 2.0, JWT, and API Key are the most common ways 
that you'll likely encounter while developing your
Next.js applications.


-: Fetching data on the client side
When making HTTP requests on browsers, some specific 
rules are not optional:
1. Make HTTP requests to trusted sources only. You should 
always do some research about who is developing the APIs 
you're using and their security standards.

2. Call HTTP APIs only when secured with an SSL certificate. 
If a remote API is not secured under HTTPS, you're exposing 
yourself and your users to many attacks,

3. Never connect to a remote database from the browser.


-: Consuming REST APIs on the client side
While the server-side data fetching phase in Next.js only occurs 
when declared inside its built-in getServerSideProps and 
getStaticProps functions, if we make a fetch request inside a 
given component, it will be executed on the client side by default.
We usually want our client-side requests to run in two cases:
          • Right after the component has mounted
          • After a particular event occurs

Let's try to
recreate the same simple Next.js application from the previous 
section, but move all the API calls to the client side.
\
Every file inside the pages/api/ directory will be considered by 
Next.js as an API route.


-: Consuming GraphQL APIs
GraphQL has been a game-changer in the API world, 
and it is increasing its popularity thanks to its ease of 
use, modularity, and flexibility.

In this section, we will be using Apollo Client 
(https://www.apollographql. com/docs/react ), a very 
popular GraphQL client with built-in support for both 
React and Next.js for building a very simple online 
signbook. Let's start by creating a new project:
npx create-next-app signbook

Now, let's add a couple of dependencies:
yarn add @apollo/client graphql isomorphic-unfetch

We will need now to create an Apollo client for our 
Next.js application. We will do that by creating a new 
file inside lib/apollo/index.js and then writing the
following function:

import { useMemo } from 'react';
import {
          ApolloClient,
          HttpLink,
          InMemoryCache
} from '@apollo/client';

let uri = 'https://rwnjssignbook.herokuapp.com/v1/graphql';
let apolloClient;

function createApolloClient() {
          return new ApolloClient({
                    ssrMode: typeof window === 'undefined',
                    link: new HttpLink({ uri }),
                    cache: new InMemoryCache(),
          });
}

As you can assume, by setting ssrMode: typeof 
window === "undefined" , we will use the same Apollo 
instance for both client and server. Also, ApolloClient
uses the browser fetch API to make HTTP requests, so 
we'll need to import a polyfill to make it work on the 
server side; in that case, we'll be using isomorphic-unfetch .

Inside the same lib/apollo/index.js file, let's add a new 
function to initialize the Apollo client:

export function initApollo(initialState = null) {
          const client = apolloClient || createApolloClient();

          if (initialState) {
                    client.cache.restore({
                              ...client.extract(),
                              ...initialState
                    });
          }

          if (typeof window === "undefined") {
                    return client;
          }

          if (!apolloClient) {
                    apolloClient = client;
          }

          return client;
}

This function will allow us to avoid recreating a new 
Apollo client for each page. In fact, we will store a 
client instance on the server (inside the previously written
apolloClient variable), where we can pass an initial state 
as an argument. If we pass that parameter to the initApollo 
function, it will be merged with the local cache to
restore a full representation of the state once we move to 
another page.

To achieve that, we will first need to add another import 
statement to the lib/apollo/index.js file. Given that 
re-initializing the Apollo client with a complex
initial state can be an expensive task in terms of 
performance, we will use the React useMemo hook 
to speed up the process:
import { useMemo } from "react";

And then, we will export one last function:
export function useApollo(initialState) {
          return useMemo(
                    () => initApollo(initialState),
                    [initialState]
          );
}

Moving to our pages/ directory, we can now create a new _app.js file

import {ApolloProvider} from '@apollo/client'
import {useApollo} from '../lib/apollo'


export default function App({Component, pageProps}) {
	
	const apolloClient = useApollo(pageProps.initialApolloState);

	return (
		<ApolloProvider client={apolloClient}>
			<Component {...pageProps} />
		</ApolloProvider>
	)
}

We can finally start to write our queries!
We will organize our queries inside a new folder 
called lib/apollo/queries/ . Let's start by creating 
a new file, lib/apollo/queries/getLatestSigns.js ,
exposing the following GraphQL query:











cont on pg 123
*/ 