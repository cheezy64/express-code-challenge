# Responses
I was thinking of how to be consistent so that the front end will know what to expect.  Conveniently, the
requirements ask us to follow the JSend spec!

# Database
## Schema
Users, institutions, and books are standalone entities so I decided that a collection for each is necessary.
Now, to consider size
* Millions of users
* Thousands of institutions
* Millions of books

I did some [research](https://grokbase.com/t/gg/mongodb-user/128r0h5gzw/inserting-into-300-000-size-embedded-array-is-slow-even-w-o-indexes) and found that large arrays in a document causes huge performance issues.  The recommendation (in 2012) is below a few hundred.

The `User` model will be as defined, and have a reference to an array of references to institutions.  Denormalization is
also ok, but not necessary

The `Institution` model will be as defined

The `Book` model will have an array of the references to institutions, reaching up to thousands (I think this is acceptable due to the outdated recommendation).  We should also denormalize the institution names, as the institution name isn't expected to change often
