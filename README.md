# New App Setup (Milestone 1)

## Prerequisites

- Install the `node` javascript runtime from [https://nodejs.org/en/download](https://nodejs.org/en/download)

## Setting up our application’s directory structure

Note that `the-empty-term-project-repository` will be created from the term project github assignment link in Canvas.

```
git clone the-empty-term-project-repository
npm init -y
```

(Feel free to update the `description`, `author`, and `license` fields in the `package.json` file created by `npm init`.)

Next, we will create directories to distinguish between our front end javascript (the code that will be delivered to the client to be able to implement things like chat functionality, and the ability to dynamically update a page) and our back end javascript (the code that will be used to respond to client requests).

```
mkdir frontend backend
```

Finally, create the entry point for our backend (this is just an empty file for now; we will add some code shortly):

```
touch server.js
```

To ensure that we do not commit certain files into our repository (`node_modules/` because they can be installed using npm install, and `.env` because it will hold strings that we do not want to make public, and that will be used only for local development):

```
touch .gitignore
```

In the `.gitignore` file, add the following:

```
node_modules/*
.env
```

## Create a basic Express server

We will be using [https://expressjs.com/](https://expressjs.com/) to implement the backend code for our term project. Express provides an API that allows us to write javascript code to respond to HTTP requests, as well as providing the ability to host static files, and to dynamically generate HTML responses to send to the client. We will be discussing how to do this as we continue to work on our projects, but for now, we need to include the express dependency in our project.

We use the node package manager (`npm`) to install the required dependency:

```
npm install express
```

This installes the express package into our project by downloading the express package, and all dependencies of the express package, into the `node_modules/` folder, and updating `package.json` to record this dependency for our project.

Now, we can create a _minimal_ server by adding the following code to `server.js`:

```js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
```

This code requires (another way of saying includes or imports) the `express` function (that is exported from the `express` package) into `server.js`, then uses the function to create an instance of an express application. (See [https://expressjs.com/en/5x/api.html#app](https://expressjs.com/en/5x/api.html#app) for the express application API.) We then set up a "route" - this defines an HTTP verb (in this case, `get`), and a URL (in this case, the root of our site: `"/"`) that the express server will monitor for requests.

When an HTTP request is received that _matches this verb and URL_, the express application will invoke the "handler" function we define, passing in `request` and `response` objects that we can use to create a response to the client. In this case, we use the `response` object’s `send` method to respond with the text, "Hello World!".

We can run this using the `node` javascript runtime:

```
node backend/server.js
```

We can verify it is working by visiting [http://localhost:3000](http://localhost:3000), where we should see the text that we used the `response` object to send to the client (”Hello World!”).
