

# Server Recipe

## Installation

### Before starting the server, make sure to install the necessary Node.js modules:

### npm install


## Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

| dotenv
| Variable     | Description                                                |
| ------------ | ---------------------------------------------------------- |
| DB_URL       | MongoDB connection URL for your database.                   |
| PORT         | Port number on which the server will run.                  |
| BCRYPT_SALT  | Number of salt rounds for bcrypt hashing.                   |
| JWT_SECRET   | Secret key used for signing JWT tokens.                    |



## Endpoints

### Users Resource

| URL                                      | Method | Description                    | Permissions     | Parameters          | Optional Parameters | Body                | Headers         | Returns | Status Codes |
| ---------------------------------------- | ------ | ------------------------------ | --------------- | ------------------- | ------------------- | ------------------- | --------------- | ------- | ------------ |
| [http://localhost:5000/user/signIn](http://localhost:5000/user/signIn) | POST   | User sign in|-|-|-|{email,password}|-|user+token| 204|
| [http://localhost:5000/user/signUp](http://localhost:5000/user/signUp) | POST   | User sign up|-|-|-|{username,email,password,addres}|-| User+token|204|
| [http://localhost:5000/user](http://localhost:5000/user)| GET    | Get all users| current user or manager|-|-|-|all user      | 200           |

### Recipes Resource

| URL| Method | Description                      | Permissions     | Parameters          | Optional Parameters | Body               | Headers         | Returns | Status Codes |
| ------------------------------------------------------------- | ------ | -------------------------------- | --------------- | ------------------- | ------------------- | ------------------ | --------------- | ------- | ------------ |
| [http://localhost:5000/recipe](http://localhost:5000/recipe) | GET    | Get all recipes | - |-| -| -               | -       |all recipes|200|
| [http://localhost:5000/recipe/:id](http://localhost:5000/recipe/:id) | GET    | Get recipe by ID                 | - |*id*|-|-|-|recipe by *id*|200|
| [http://localhost:5000/recipe/byUserId/:userid](http://localhost:5000/recipe/byUserId/:userid) | GET    | Get recipes by user ID           | current user |*id user*|-|-|token|recipe by *user id*|200|
| [http://localhost:5000/recipe/byPrepTime/:prepTime](http://localhost:5000/recipe/byPrepTime/:prepTime) | GET    | Get recipes by preparation time           | - |*id user*|-|-|-|recipe by *user id*|200|
| [http://localhost:5000/recipe](http://localhost:5000/recipe) | POST   | add recipe  |current user|-|-|{recipe}|token|new recipe added|204|
| [http://localhost:5000/recipe/:id](http://localhost:5000/recipe/:id) | PUT    |   update existing reipe  (by *recipe id*) | current user |*recipe id*|-|{new recipe}|token|return  updated recipe|204|
| [http://localhost:5000/recipe/:id](http://localhost:5000/recipe/:id) | DELETE |   deleting existing reipe  (by *recipe id*) | current user |*recipe id*|-|-|token|-|204|

### Categories Resource

| URL                                                              | Method | Description                      | Permissions     | Parameters          | Optional Parameters | Body               | Headers         | Returns | Status Codes |
| ---------------------------------------------------------------- | ------ | -------------------------------- | --------------- | ------------------- | ------------------- | ------------------ | --------------- | ------- | ------------ |
| [http://localhost:5000/category](http://localhost:5000/category) | GET    | Get all categories             | everyone|-|-|-|all |all category|200|        
| [http://localhost:5000/category/getAllCategoriesRecipes](http://localhost:5000/category/getAllCategoriesRecipes) | GET    | get all category with recipe| - |-|-|-|-|all category with recipe |200|
| [http://localhost:5000/category/:id](http://localhost:5000/category/:id) | GET    | get category by id with recipe| - |*id*|-|-|-|category by id with recipes |200|
