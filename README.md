# Share Movies API
This is a Rails API application for Funny Movies, a web application that allows users to rate and review movies.

## Prerequisites

Before you begin, ensure you have the following installed:

- Ruby 3.1.3
- Rails 7.0.4.3

## Installation
- Clone the repository: 
```
git clone https://github.com/lytrungtin/share_movies
```
- Navigate to the project directory: 
```
cd share_movies
```
- Install dependencies: 
```
bundle install
```
- Create the database: 
```
rails db:create
```
- Migrate the database: 
```
rails db:migrate
```


## Running the Application
To run the application, run the following command in your terminal:
```
rails s
```
This will start the Rails server on http://localhost:3000.


## API Endpoints
The following endpoints are available:
- POST /login -  Log in or Create a new user if user is not existed with email and password. Returns an access token if successful.
```JSON
{ 
    "email": "test@example.com",
    "password": "123456"
}
```
- DELETE /logout - Log out and invalidate the current access token.
- GET /shares - Get a list of shared movies.
- POST /shares/ - Share new movie with params:
```JSON
{ 
    "share": { 
        "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
    } 
}
```

## Authentication
This API uses JWT (JSON Web Tokens) for authentication. To authenticate, send an access token in the Authorization header:
```
Authorization: Bearer <access_token>
```
The access token is returned from the /login endpoint.


## Testing
To run the tests, run the following command in your terminal:
```
rails test
```
This will run the test suite for the application.

## License
This project is licensed under the MIT License.