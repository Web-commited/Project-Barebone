# Project BareBone

## Introduction

This project consists of a Nest.js backend and Next.js frontend, A simple version of a user authentication system.

## Features

- **Feature 1**: User Registeration.
- **Feature 2**: Authentication.
- **Feature 3**: User data CRUD.
- **Feature 4**: Visible Logs.

## Installation and Usage

To install and use this project, follow these steps:

1. Clone the repository.
   ```
   git clone https://github.com/Web-commited/Project-Barebone.git
   ```
2. Navigate to the server directory and install dependencies.
   ```
   cd sever
   npm install
   npm run start
   ```
3. Add another terminal and Navigate to the server directory and install dependencies.
   ```
   cd client
   npm install
   npm run dev
   ```

## Timeline of Events

(Dates are aliases of important breakthroughs instead of physical 24 hours)

### Day 1

initialization of project and setting up basic structure.

### Day 2

establishment of connection between frontend and backend with fuctional database utilisation

### Day 3

Frontend form to make POST and GET requests to the backend, where it is stored without authentication,Debug components finished, end of **Physical day 1**

### Day 4

backend jwt& local authentication: successfully implemented: if the hashed password input is the same as in the database, then return a jwt, otherwise nothing.

### Day 5

Protect Controllers with AuthGuard

### Day 6

Frontend entry points, should be able to first: register and submit forms to the backend after validation and sanitization, also should use react datepicker to make sure that the user is not under 18 years old.

### Day 7

Frontend entry points generally finished, able to register and login with different forms, end of **Physical day 2**

### Day 8

Added redux to store jwt token and username

### Day 9

initial version of server console logs when authentication fails, bad idea. Added 401 server error when auth fails, and corresponding alerts in the frontend

### Day 10

Frontend UX update: entering gives options to register or login.
Also DOMPurify for sanitization

### Day 11

edit profile: button, form & backend put method

### Day 12

changelog: solution--add another repository that documents: username&id, time of log, type of action, what happened, end of **Physical day 3**

### Day 13

TODO:
5.changelog printing
7.tests
8.responsive design
9.optional: add to schema some other forms of data
