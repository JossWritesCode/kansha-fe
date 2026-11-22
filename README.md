# Kansha Rewards

[![Maintainability](https://api.codeclimate.com/v1/badges/3f8a06f69c5b6436e9b6/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/kansha-fe/maintainability)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Contributors

### Labs 21

* **Kevin Smith** - [keveightysev](https://github.com/keveightysev)
* **Andrew Ackerman** - [ackers93](https://github.com/ackers93)
* **Emily Bruner** - [emilybruner](https://github.com/emilybruner)
* **Anna Franceschi** - [bamfranceschi](https://github.com/bamfranceschi)
* **Aaron Gillies** - [Hail91](https://github.com/Hail91)
* **Andrew Maddocks** - [AndrewMaddocks](https://github.com/AndrewMaddocks)
* **Vickie Nelson** - [victoriaisabeldesign](https://www.linkedin.com/in/victoriaisabeldesign/?trk=public_profile_browsemap_profile-result-card_result-card_full-click)
* **Joscelyn Stancek** - [JossWritesCode](https://github.com/JossWritesCode)
* **Vanessa Tellez** - [vtellez1](https://github.com/vtellez1)


### Labs 19

* **Cori Paris** - [coriagogo](https://github.com/coriagogo)
* **Sydney Crumley** - [srsimps19](https://github.com/srsimps19)
* **Andrew Goenner** - [drewgoenner](https://github.com/drewgoenner)
* **Gustavo Isturiz** - [gisturiz](https://github.com/gisturiz)
* **Ty Lippe** - [TyLippe](https://github.com/TyLippe)
* **Ahmar Mansoor** - [ahmarsworld](http://ahmarsworld.blackwidowtech.com/)
* **Matt Masters** - [TamaHills](https://github.com/TamaHills)
* **Gizella Ortiz** - [gizellaortiz](https://dribbble.com/gizellaortiz)
* **Leslie Rodriguez** - [rleslie1015](https://github.com/rleslie1015)
* **Nicholas Truson** - [NicholasTruson](https://github.com/NicholasTruson)




## Project Overview
### Labs 21

[Database Schema](https://dbdiagram.io/d/5e4ad5579e76504e0ef18d3e)

[Trello Board](https://trello.com/b/AZKBscuK/kansha-labs-21)

[Product Canvas](https://www.notion.so/Kansha-fdf86e4459934f979df4eefd5c409b4a)

[UX Design Files](https://www.figma.com/file/plY8UaoINAhmgXaaD49t1X/Kansha%2C-Vickie?node-id=177%3A12)


### Labs 19
[Trello Board](https://trello.com/b/47q9LIO5/kansha)

[Product Canvas](https://www.notion.so/Kansha-fdf86e4459934f979df4eefd5c409b4a)

[UX Design Files](https://www.figma.com/file/EtD3IAhwlPsT91V1oAJ1QX/Labs18_Kansha%2C-Gizella-%26-Ahmar?node-id=533%3A1360)

Kansha Rewards is an app that was designed to increase satisfaction and productivity in the workplace by allowing employees to send recognition and badges to their peers in an app.  The badges appear on the profile page, and the recognition appears on both the profile page and a live feed of all recognition, where employees will also be able to send a reaction and/or comment on the recognition.


### Key Features

-    Register a new user by using Auth0
-    Send recognition and badges to peers to thank them for their hard work
-    Admins can delete users and any recognition/comments
-    Mods can delete recognition/comments in their own department
-    Users can comment and like recognition in a live feed, and see what badges their peers have earned.

## Tech Stack

### Front end built using:

#### _React_

-    React allows us to determine and built the best architecture for our team
-    Already known by the entire team, thus making it the easiest to work with

#### _Redux_

-    Greatly simplifies global state management
-    Versatile in its utility

#### _Sass_

-    Allowed us to style according to our UX designer's specifications

#### Front end deployed to `Railway`

#### [Back end](../kansha-be) built using:

#### _Node_

-    Simpler and easier to use with Java, as its javascript.
-    Node is what the majority of us learned for our backend unit

#### _Express_

-    Very capable and full featured
-    Most of the team is familiar with Express
-    The Connect Middleware functionality makes our backend service very extensible.

#### _Knex_

-    Extremely flexible
-    Full featured schema and query builders
-    lets us switch from development to staging to production with ease.

# APIs

## auth0

Authenticate and authorize apps and APIs with any identity provider running on any stack any device or cloud.  It is simple to integrate and allows users to just sign up with a Google account if they wish.

## Image storage

Profile pictures are uploaded through the API to a private Railway Bucket (S3-compatible). Badge art and the default avatar are static files in `public/badges/` and `public/images/`. The current badges are placeholders, because the originals were lost with the old S3 bucket.



# Running locally

1. Use Node 22 (`nvm use` reads `.nvmrc`).
2. `yarn install`
3. `cp .env.example .env.local` and fill it in. You need an Auth0 SPA application and a running [API](../kansha-be).
4. `yarn dev` starts the dev server on http://localhost:3000.

## Scripts

-   `yarn dev`: local development server
-   `yarn build`: production build into `build/`
-   `yarn start`: serves `build/` (used on Railway; handles client-side routes)
-   `yarn test`: runs the Jest tests

# Environment Variables

| Variable | Example |
|---|---|
| `REACT_APP_BASE_URL` | `https://<api>.up.railway.app` |
| `REACT_APP_AUTH_DOMAIN` | `<tenant>.us.auth0.com` |
| `REACT_APP_CLIENT_ID` | Auth0 application Client ID |
| `REACT_APP_REDIRECT_URI_BASE` | this app's URL, e.g. `https://<frontend>.up.railway.app` |

Create React App bakes these in **at build time**. After changing one on Railway, redeploy.

# Deploying to Railway

Add a service from this repo. Railway's default builder runs `yarn build`, then `yarn start`, and needs no config file. Set the variables above, then generate a public domain under **Settings → Networking**.

In Auth0, add the Railway URL (and `http://localhost:3000`) to **Allowed Callback URLs**, **Allowed Logout URLs** and **Allowed Web Origins**.

# Testing

Tests use Jest, Enzyme and React Testing Library. `.env.test` provides dummy Auth0 values. Some legacy tests are out of date; CI runs them without blocking merges until they're fixed.

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request
   
 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Backend Documentation](https://github.com/Lambda-School-Labs/kansha-be) for details on the backend of our project.
.
