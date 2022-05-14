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

*/ 