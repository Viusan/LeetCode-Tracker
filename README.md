# LeetCode Tracker

Using SQLite because it is lightweight and perfect for what I need it for. I am only tracking notes so I don't need an advanced database.

I am following this tutorial: [How to Use SQLite in Node.js Applications](https://oneuptime.com/blog/post/2026-02-02-sqlite-nodejs/view)

## Setup

You need Node.js installed. If you don't have it, run this in your terminal:

```
winget install OpenJS.NodeJS.LTS
```

Install the better-sqlite3 library:

```
npm install better-sqlite3
```

Install Express, which is a framework that makes it easier to send data and whatnot:

```
npm install express
```

## Why two JavaScript files

We need two different JavaScript files since browsers universally refuse any website direct access to your filesystem.

`app.js` never touches the database — it just packages up the form values and sends them to `server.js`, which is the only code that has direct access to the database.

## Running it

To start the server, run:

```
node server.js
```