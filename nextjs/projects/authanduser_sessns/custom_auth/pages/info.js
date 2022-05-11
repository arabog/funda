/*
https://github.com/arabog/youtube-2020-june-multi-step-form-formik?organization=arabog&organization=arabog

A brief introduction to user sessions and authentication
When talking about user authentication, we refer to that 
process that identifies a specific user, letting them read, 
write, update, or delete any protected content, depending 
on their authorization level.

There are many different authentication strategies, but 
the most common are:
• Credentials-based authentication: This method allows us
 to log in to a system using personal credentials, commonly, 
 an email address and a password.

• Social login: We can log in to a system using our social 
accounts (Facebook, Twitter, LinkedIn, and so on).

• Passwordless login: Over recent years, this has become 
a pretty popular authentication method. Platforms such as 
Medium and Slack will send you what's called a "magic link" 
to your email address, letting you enter your account without
typing any password.

• Single sign-on (SSO): If you've worked in a big company, 
you may have experienced this. Services such as Okta provide 
a way of using unique credentials for many different services, 
centralizing user authentication over their own service.
Once you log in to an SSO system, it will redirect you to the 
desired website, granting your identity.

-: Understanding JSON web tokens
Let's take the following JWT as an example:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MDhlYWZhNy03M-
WJkLTQyMDMtOGY3Ni1iNjA3MmNkMTFlODciLCJuYW1lIjoiSmFuZSBEb2UiL-
CJpYXQiOjE1MTYyMzkwMjJ9.HCl73CTg8960TvLP7i5mV2hKQlSJLaLAlmvHk-
38kL8o

If we pay enough attention, we can see three different chunks of 
data separated by periods. 
The first part represents the JWT  header. It contains two 
essential pieces of information: the token type and the 
algorithm used for signing it

The second part is the payload. Here is where we put all the 
non-sensitive data that can help us identify our users. Never 
store data such as passwords and bank details inside a
JWT payload.

The third and last part of a JWT token is its signature. This is 
what makes JWTs secure

Once we need personal user data, we can set this JWT as a 
cookie or use it as a bearer token inside an HTTP 
authorization header. Once the server gets this data, it 
will verify the token, and here is where the third token 
section becomes essential.

When dealing with cookies, we can (and we should) set an 
httpOnly flag to true to make cookies available on the server 
side only. That adds an extra layer of security when storing 
this data. Even though we should be aware that every user 
can have access to cookies by inspecting them using the 
dev tools provided by modern browsers, we should never 
share sensitive information there.









*/ 

