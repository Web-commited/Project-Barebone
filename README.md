# Project BareBone

## Introduction

This project consists of a Nest.js backend and Next.js frontend, A simple version of a user authentication system.
This project had me learn TypeORM and Nest from scratch, and I spend 3 physical days (approx 6 hours every physical day) tackling this backbone project.
The biggest roadblocks throughout the project are dependency issues in the backend, which is because of my lack of familiarity to the framework.

## Features

- **Feature 1**: User Registeration.
- **Feature 2**: Authentication.
- **Feature 3**: User data CRUD.
- **Feature 4**: Visible change Logs.

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
3. Add another terminal and Navigate to the client directory and install dependencies.
   ```
   cd client
   npm install
   npm run dev
   ```

## Timeline of Events

(Dates are aliases of important breakthroughs instead of physical 24 hours)

### Day 1

Initialization of project and setting up basic structure.

### Day 2

Establishment of connection between frontend and backend with fuctional database utilisation

### Day 3

Frontend form to make POST and GET requests to the backend, where it is stored without authentication,Debug components finished, end of **Physical day 1**

### Day 4

Backend jwt& local authentication: successfully implemented: if the hashed password input is the same as in the database, then return a jwt, otherwise nothing.

### Day 5

Protect Controllers with AuthGuard

### Day 6

Frontend entry points, should be able to first: register and submit forms to the backend after validation and sanitization, also should use react datepicker to make sure that the user is not under 18 years old.

### Day 7

Frontend entry points generally finished, able to register and login with different forms, end of **Physical day 2**

### Day 8

Added redux to store jwt token and username

### Day 9

Initial version of server console logs when authentication fails, bad idea. Added 401 server error when auth fails, and corresponding alerts in the frontend

### Day 10

Frontend UX update: entering gives options to register or login.
Also DOMPurify for sanitization

### Day 11

Edit profile: button, form & backend put method

### Day 12

Changelog: solution--add another repository that documents: username&id, time of log, type of action, what happened

### Day 13

Tests, end of **Physical day 3&4**

## Acknowledgements

This is a list of problems that I understand exists, but do not have the time to tackle the problem in time, it is ordered from most severe to least.

### Problem 1

Secrets are exposed.

**Solution:** .env.example and .env.local should be a part of the repository

### Problem 2

Password does not ensure TLS.

**Solution:** hashing the password in the frontend instead of the backend, so that the password is hashed when transmitting.

### Problem 3

Logs are queried by their username, hence if a profile edit changes the username, the log is unreachable.

**Solution:** use userId and add that to the redux store.

### Problem 4

Credentials doesn't persist in between refreshes.

**Solution:** tokens should be stored in either local or session/cookie storage.

### Problem 5

Not enough tests and backend dependency issues.

**Solution:** spend more time on writing tests and managing dependencies.
