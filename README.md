# New App Setup (Milestone 1)

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
