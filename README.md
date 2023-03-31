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
touch backend/server.js
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

## Organizing the server code

Eventually, we will be adding quite a few additional routes to the server, and we want to avoid creating a single, massive, hard to main server file. One tool that express provides us with is the `Router` ”middleware” (more on this later) that allows us to create individual routes in modules (separate files), and then “mount” those routes in our main application instance.

Create a directory where our route logic will go, and an initial route file for our root routes:

```
mkdir backend/routes
touch backend/routes/root.js
```

As we add additional functionality like authentication and authorization, game logic, chat logic, etc., we can break up the routes into easy to understand and maintain files in this new directory.

Add the following code to import the express `Route` middleware, create the route we previously defined in `server.js`, and then export that route so that another module can import (require) it:

```js
const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  response.send("Hello world from within a route!");
});

module.exports = router;
```

Now, we can refactor `server.js` to include the following code:

```jsx
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const rootRoutes = require("./backend/routes/root");

app.use("/", rootRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
```

This imports the routes that were exported from the `root.js` file, and then "mounts" all of the routes defined in that `Router` under the `"/"` URL (appends the URLs from the route to the root URL).

If you left the server running from the previous section and refresh the [http://localhost:3000](http://localhost:3000) page, you won'’'t see a change! In order for node to load the change, it needs to reload the file. To do this stop the server (`Ctrl-C` on a \*nix system), and start it again using the `node backend/server.js` command. (This is tedious, and we will work on a way to automate this shortly.)

Visiting [http://localhost:3000](http://localhost:3000) should now show us the updated content.
