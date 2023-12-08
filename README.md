# Clapperboard

## [See the App!](https://clapperboard-app.netlify.app/)

![App Logo](public\ClapperboardBold.png)

## Description

Clapperboard is a website made for and by movie lovers. Here you can search for any movie you like, write a review and create custom lists with any topic. See what other users love and share your opinion with them.

#### [Client Repo here](https://github.com/raulgarrigos/clapperboard-client)
#### [Server Repo here](https://github.com/raulgarrigos/clapperboard-server)

## Backlog Functionalities

- Favorite movies list
- Watchlist
- About page
- Chat between users
- Admin powers
- More movie details
- Search by other queries than movie titles

## Technologies used

HTML, CSS, Javascript, Express, React, axios, React Context, The Movie Database API, Bootstrap, Vite launcher, Cloudinary.

# Client Structure

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **profile** - As a user I want to see my profile and edit my data
- **reviews** - As a user I want to see the reviews I wrote
- **lists** - As a user I want to see the lists I have created

## Client Routes

**NOTE -** Use below table to list your frontend routes

## React Router Routes (React App)
| Path                      | Page            | Components        | Permissions              | Behavior                                                      |
| ------------------------- | ----------------| ----------------  | ------------------------ | ------------------------------------------------------------  |
| `/`                       | Home            |                   | public                   | Home page. Shows most popular films from API                  |
| `/register`               | Register        |                   | anon only                | Signup form, login immediately, navigate to homepage after    |
| `/login`                  | Login           |                   | anon only                | Login form, link to signup, navigate to homepage after login  |
| `/profile`                | Profile         |                   | public                   | Show user info and nav to reviews and list from user          |
| `/profile/edit`           | ProfileEdit     |                   | user only`<IsPrivate>`   | Edit your profile information                                 |
| `/profile/{user}/reviews` | Reviews         | ImageApi          | public                   | Shows all reviews made by some user and owner can edit them   |
| `/profile/{user}/lists`   | CustomList      | AddList           | public                   | Shows all lists made by some user and owner can create them   |
| `/profile/{user}/{list}/details`   | ListDetails   | AddMovieList    | public              | Shows the details of one list and user can edit them          |
| `/movie/{movie}/details`  | MovieDetails    | AddReview, ImageApi| public                  | Shows the details of a movie and the reviews made by users    |
| `/movie/{query}/results`  | MovieResults    | ImageApi           | public                  | Shows the results of a search query made by user              |


## Other Components

- AppNavbar
- IsAlreadyLoggedIn
- IsPrivate
- Search

## Context

- auth.context
  
## Links

### Collaborators

[Adrián Siquier](https://github.com/bluesaurio)

[Raül Garrigós](https://github.com/raulgarrigos)

### Project

[Repository Link Client](https://github.com/raulgarrigos/clapperboard-client)

[Repository Link Server](https://github.com/raulgarrigos/clapperboard-server)

[Deploy Link](https://clapperboard-app.netlify.app/)


### Slides

[Slides Link](https://www.canva.com/design/DAF0aknPV80/fBdScmps8tBISpPhzT_RTg/view?utm_content=DAF0aknPV80&utm_campaign=designshare&utm_medium=link&utm_source=editor)