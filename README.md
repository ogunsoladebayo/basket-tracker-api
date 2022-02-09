# Technical assignment back-end engineer

As part of an engineering team, you are working on an online shopping platform. The sales team wants to know which items were added to a basket, but removed before checkout. They will use this data later for targeted discounts.

Using the agreed upon programming language, build a solution that solves the above problem.

**Scope**

-   Focus on the JSON API, not on the look and feel of the application.

**Timing**

You have one week to accomplish the assignment. You decide yourself how much time and effort you invest in it, but one of our colleagues tends to say: "Make sure it is good" ;-). Please send us an email (jobs@madewithlove.com) when you think the assignment is ready for review. Please mention your name, Github username, and a link to what we need to review.

# Solution Notes

## Technologies used

> This API is built with the following stack;
>
> -   [Node.js](https://nodejs.org/)
> -   [TypeScript](https://www.typescriptlang.org/)
> -   [Express.js](https://expressjs.com/)
> -   [MikroORM](https://mikro-orm.io/)
> -   [PostgreSQL](https://www.postgresql.org/)

## Usage

### Running app in local environment

Copy contents of file ".env copy" to ".env" and update the values/settings to your preference.

1. Install dependencies: `npm install`
2. Run app in dev mode: `npm run dev`
3. ...or run in prod mode: `npm start`
4. application should start running on localhost:3000 or port from environment variable specified for PORT in production mode(NODE_ENV).
5. Swagger Docs/UI will be available on `{base-url}/swagger`.
6. Default sales rep account is seeded with username: `rep` and password: `SaLeSReP`. NOT ADVISABLE TO USE IN PRODUCTION.

### Docker compose

> Run `docker-compose up --build -d` from the root of the project

## Demo

<!-- The API is live at [Basket Tracker API]() -->

Extensive documentation with examples [here](https://documenter.getpostman.com/view/11616904/UVeKnj7m)

-   Version: 1.0.0
-   Lisence: MIT
-   Author: Usman Ogunsola
