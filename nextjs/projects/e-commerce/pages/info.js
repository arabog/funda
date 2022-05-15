/*
To generate a static page at build time, let's head to our pages/index.js 
page and retrieve the products inside the getStaticProps function.

export const getStaticProps = async () => {}

At this point, we might be wondering how to handle cases where 
we create a new product and want to display it immediately on the 
home page. Here, we have two options:

• Use getServerSideProps instead of getStaticProps , which will
dynamically generate the page on each request, but we already 
know its downsides, as seen in Chapter 10, Working with SEO 
and Managing Performance.

• Use incremental static regeneration so that after a given period, 
the page gets regenerated, including any new API changes.

As for the home page, we will use SSG + ISR to build all the product 
pages, which will help us maintain great performance and improve 
SEO and user experience.

https://dashboard.stripe.com/apikeys


Example Projects
-: Streaming website
https://www.themoviedb.org

https://www.themoviedb.org/documentation/api

To complicate things (just like in real-world scenarios), a user 
must be authenticated to see all the movies available in the 
applicatio

When a trailer is available, the user should be able to watch 
it on the movie page.
• All the images must be served using Next.js' <Image/> component.
• Users can log in and out.

Before starting to write the code for this application, I 
suggest you try to answer the following questions:
• What kind of rendering strategy should I choose for the 
individual movie pages?
• Where should I deploy this application?
• How can I ensure that the user is logged in when browsing 
the website?
• How would the application perform if there were hundreds 
(or thousands) of
concurrent users browsing it? Would that change my answer 
to the first question?

-: Blogging platform
You must observe the following requirements:
• You must use TailwindCSS for styling the UI.
• You must use TypeScript for coding the application.
• Every blog page must be statically rendered at build time.
• The UI must be as similar as possible to your favorite blog.
• Users can log in and save articles into a reading list.
• All the images must be served using Next.js' <Image/> component.
• SEO is essential. It must achieve a 100% Lighthouse SEO score.

Bonus point: if you feel confident enough, you can also build a 
simple editing page where users can write their articles and share 
them on the website. In this exercise, you're supposed to follow 
some strict requirements (the CMS to use, styling methods, 
and the language)

-: Real-time chat website
For this exercise, you're required to build a real-time chat 
application with the following features:
• There must be multiple chat rooms.
• People can join any room by just inserting their name; no 
login is required.
• When people enter a room, they can access the full chat 
room history.
• Communication must be in real time.
• Bonus point: allow users to create new chat rooms.

This is a fascinating exercise because there are many different 
things to consider. For example, what if a user knows a given 
room URL and tries to join without entering their name? Where 
should all the messages be stored? How can those messages 
be sent and retrieved in real time?

There are multiple great products that can help build secure, 
real-time software; the most interesting one is undoubtedly 
Google Firebase. It provides a free real-time database with 
end-to-end encryption that makes creating any chat app 
possible with ease.

https://nextjs.org/blog

React 17 Design Patterns and Best Practices



-: 


*/ 