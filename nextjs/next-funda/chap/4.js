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







cont on pg 76

*/ 