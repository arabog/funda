/*
npx create-next-app <app-name>

By default, React runs on the client side (meaning that it
runs on the web browser), so a web application written 
entirely with that library could negatively affect Search 
Engine Optimization (SEO) and initial load performance, 
as it takes some time to be correctly rendered on screen. 
In fact, to display the complete web app, the browser 
had to download the entire application bundle, parse 
its content, then execute it and render the result in the 
browser, which could take up to a few seconds (with
very large applications).

Vercel came up with Next.js, which has turned out to 
be a game-changer.

In fact, every JavaScript file inside the pages/ directory 
will be a public page, so if you try to duplicate the index.js 
page and rename it about.js , you'll be able to go to 
http://localhost:3000/about and see an exact copy of your 
home page.

The public/ folder contains all the public and static assets 
used in your website. For example, you can put your images, 
compiled CSS stylesheets, compiled JavaScript files, fonts, 
and so on there.

By default, you will also see a styles/ directory; while this is 
very useful for organizing your application stylesheets, it is not 
strictly required for a Next.js project. The only mandatory and 
reserved directories are public/ and pages/ , so make sure not to
delete or use them for different purposes.

That said, you're free to add more directories and files to the 
project root, as it won't negatively interfere with the Next.js 
build or development process. If you want to organize your 
components under a components/ directory and your utilities 
under a utilities/ directory, feel free to add those folders inside 
your project.

For instance, if you create a page containing three components
from three different libraries, webpack will merge everything into 
a single bundle to be shipped to the client. To put it simply, we can 
think of webpack as an infrastructure for orchestrating different 
compilation, bundle, and minification tasks for every web asset
(JavaScript files, CSS, SVG, and so on)






*/ 