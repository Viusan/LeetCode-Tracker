Using SQLITE cause it is lightweight and perfect for what i need it for. I am only tracking notes so i don't need an advanced database.

I am following this tutoiral:
https://oneuptime.com/blog/post/2026-02-02-sqlite-nodejs/view

You need node.js installed, if you dont have it run this in your command:
winget install OpenJS.NodeJS.LTS

Install better-sqlite3 library:
npm install better-sqlite3

Install express which is a framework which makes it easier to send data and whatnot:
npm install express

We need two different javascript files since browsers universally refuse any websites direct access to your filesystem. 
app.js never touches the database but packages up the form values and sends them to server.js which is the only code that has direct access to database.