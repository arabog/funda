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



cont on pg 76

*/ 