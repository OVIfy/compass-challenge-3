# compass-challenge-3
My submission for the third challenge of the compass scholarship program.
The challenge was to build a simple api following this [swagger documentation](https://app.swaggerhub.com/apis-docs/PAULOSENA/sp_nigeria_third_challenge/1.0.0) using typescript, express and jest for unit
tests with at least 50% coverage
- [Installation](#installation)
- [Documentation](#documentation)
- [Changelog](#changelog)
- [License](#license)

## Installation

## description
This is my solution to the second challenge courtesy of Compass Academy Scolarship, Node js tract. It is a simple user API that has the following features
- input validation
- CRUD operations on user records
- user authentication and authorization

## technologies used
for this project i used the following technologies
- Express (Node js framework)
- MongoDB/Atlas (Database)

and these packages:
- JOI for input validation
- bcrypt for hashing
- JsonWebToken for jwt tokens

## installation
after cloning the repo on your local device run the command below to install all the dependencies listed in the package.json
```js
npm install 
```
after installation is complete you will have to create a .env file in the root of your project it should contain two values
```env
MONGO_URI=<YOUR-MONGO-URI>
SECRET=<YOUR-SECRET-KEY>
```
The MONGO URI is the connection URI to your own mongo db atlas cluster, you could use a local database as well.
THe SECRET is youe 256 bit key for constructing your json web token.

after that run node app.js. 

## overview
Route | Method | Description | Required params | Authenticated
| :---: | :---: | :---: | :---: | :---:
localhost:5000/api/v1/account | POST | Create user | {firstName, LastName, email, password, passwordConfirm, carType, zipCode, city, country} | false
localhost:5000/api/v1/account  | DELETE | delete user | None | true
localhost:5000/api/v1/account  | PATCH | update user | any of the attributes from the POST request | true
localhost:5000/api/v1/account  | GET | get current user details | None | true
localhost:5000/api/v1/auth/login  | POST | sign in | {email, password} | false
localhost:5000/api/v1/auth/logout  | DELETE | sign out | None | true

The routes with authenticated true require an Authorization header of type Bearer with a token.

__Note :__ for the PATCH route i also return a token, since the token caries user details such as the names, it has to be updated if the user changes their name as well, that's why i return a token and the user details after an update.

## challenges<a name="section_name"></a> 
What i found difficult at first was how to logout users, as that was a requirement for one of the routes and it is not possible to manually expire a token. [This Article was particulary helpful](https://medium.com/@tutorialswebsite/how-to-expire-jwt-token-on-logout-85f5c810a09d). My Solution was to blacklist logged out user tokens in the database. then during authentication check if the token provided in the request header was a blacklisted one. If that is the case an UnAuthenticated error is thrown.

## what I learnt
Firstly, I learnt how to use JOI for input validation, i was drawn towards it's simplistic nature and it's informative and detailed error messages. As this project did not require deep levels of input validation, i did not need to dig further into other features of the library but will definetly do that soon. 

Secondly I gained a better understanding of jwt tokens and the jsonWebTokens library, [i also learnt one way of handling user logout while using jwt tokens for authentication](#section_name)

Thirdly, I learnt how to automate my requests using the Test section in the Postman dashboard.
it looks something like this:
```js
let token = pm.response.json().token

if(token){
    pm.globals.unset("tok");
    pm.globals.set("tok", token);
}
```
The snippet resets the Global variable tok if a token attribute is returned from the server