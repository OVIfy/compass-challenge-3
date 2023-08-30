# compass-challenge-3
My submission for the third challenge of the compass scholarship program.
The challenge was to build a simple api following this [swagger documentation](https://app.swaggerhub.com/apis-docs/PAULOSENA/sp_nigeria_third_challenge/1.0.0) using typescript, express and jest for unit
tests with at least 50% coverage
- [Installation](#installation)
- [Documentation](#documentation)
- [Changelog](#changelog)
- [License](#license)
- [WalkThrough](#walkthrough)
- [What i lernt](#whatilearnt)

## Installation
after you have cloned the repo follow the steps below
- install dependencies
  use npm to install all dependencies using the install command below
  ```bash
   npm install
  ```
- fill in env variables
  before going ahead to run the variables the .env file in the root of your project looks something like this
  ```plaintext
    MONGO_URI=
    PORT=
    SECRET=
    TEST_MONGO_URI=
  ```
  if they are not provided appropriate values some of the test will not pass as some of them have to connect to a mongodb database using mongoose, the server will also not run as expected without connection
  to a mongodb database. __MONGO_URI__ and __TEST_MONGO_URI__ must be valid mongodb [connection uri strings](https://www.mongodb.com/docs/manual/reference/connection-string/) it could be a local db or an atlas     cluster, it is advisable to use different databases for the __MONGO_URI__ and __TEST_MONGO_URI__. __PORT__ is for the port you want the backend to run on, and the __SECRET__ is for creating jwt on successfull
  user sign in
  
- run tests
  you can now go ahead to run the tests using the command below
  ```bash
      npm test
  ```
 npm test runs the command jest --coverage --detectOpenHandles
I suggest you use that command instead because each time i try to run the tests without the --detectOpenHandles, one of the tests suites fails. and the waring jest returns is something along the line of memory leak or something like that and at this moment i do not have the experties to tackle that difficulty

- build and run server
  after the test result has been displayed you can exit the interactive jest terminal them build the typescript server using the command below
  ```bash
      npm run build
  ```

  after that run the server using
  ```bash
      npm run start
  ```
if everything was successfull you should thwn see server is running on port [whatever port you specified]


## description
This is my solution to the second challenge courtesy of Compass Academy Scolarship, Node js tract. It is a simple user API that has the following features
- input validation
- CRUD operations on user records
- user authentication and authorization

## technologies used
for this project i used the following technologies
- Express (Node js framework)
- MongoDB/Atlas (Database)
- typescript
- jest

and these packages:
- JOI for input validation
- bcrypt for hashing
- JsonWebToken for jwt tokens


## walkthrough<a name="section_name"></a> 
This challenge was challenging a whole lot😂. 

## What I learnt
i learnt a lot whike working on this challenge, but i'll give a summary
- typescript
  i leart about type annotations, type inference, interfaces, generics, decorators, type decleration files
- design patterns
  i learnt about delegation, composition, inheritance, and i'm kinda familiar to an extent with the controller-service-repository pattern
- testing
  i learn about tests, the F.I.R.S.T principle of tests, setup and teardown, AAA principle, was familiarized with jest, mocks, stubs, e.t.c
- thunderclient
  as an extra i learnt how to use the thunderClient VS code extension, my workflow with it was smooth as I did not have to leave vs code while making use of it,
  and i also learn how to automate filling in the authorization header in thunderClient

