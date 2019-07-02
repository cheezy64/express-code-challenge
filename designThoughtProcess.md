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

# Design
* Testing
  * There will be a lot of asynchronous calls, so ensure that all methods I want to test will return a promise.
  * Implementing directly inside the [get|post] Express calls will make it hard to unit test
* Questions
  * How to mock out dependencies.  In OOP, I'd use dependency injection.  Pass in mocks via constructor?
    * Update: `mockingoose` seems to be decent for mocking a mongoose model.  It does it without needing to pass the mock
    via the constructor.  Further research makes it seem like `jest` has this ability too.  Therefore, the design won't
    have mocks passed in via the constructor.

# TODO
* Instead of error literals, throw an enum value that the front end can use to localize