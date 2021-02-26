# Employee Manager Login

### Setting Up A Basic User Authentication System.
This simple application has a basic user login form which is set up to redirect to the dashboard once the correct login info is entered and as well as sign up form that redirects to the login once the form is completed with valid information.
Access to the dashboard is restricted.


### Read files with Node.js
There are a couple of ways to read files with node. The easiest way is to readFileSync(). This is a blocking script meaning that everything stops until the file is loaded.
```js
const fs = require('fs');
 function getFileContents = (filePath)=> {
    let fileContents =  fs.readFileSync(filePath) 
    fileContents = JSON.parse(fileContents)
}
```

### Read files with Node.js
There are a couple of ways to read files with node. The easiest way is to readFileSync(). This is a blocking script meaning that everything stops until the file is loaded.
```js
function writeFileContents = (filePath, data )=> {
    let fileContents = JSON.parse(fs.readFileSync(filePath))
    // assuming data is an object being passed
     fileContents.push(data)
     // convert the object to json
     fileContents = JSON.stringify(fileContents)
     // write file and data
     fs.writeFileSync(fs.readFileSync(filePath), fileContents)
}
```

### EJS Templates
If the user email and password validates for the login page then they are granted access to the dashboard. There is a file called users.json. That is the file that mimics a database. This application will read this file and see if the provided email and password matches the one in the users.json file.  

Install ejs in the server folder.
```
  npm install ejs
```
Configure ejs as the templating engine to use with this project.
```javascript
const ejs = require('ejs')
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
```

 #### How to send a server side template file as a response
```javascript
 res.render('dashboard')
```

 #### Sending Data To A Template
```javascript
 res.render('dashboard', {pageTitle:"Dashboard", pageHeading:"DashBoard Template"})
```


- create dashboard page as server side template using ejs.
- create user.json file to save platform users
- create a fileService to read and write files.
- create a login post route to handle the form.
- how to get form data from the body.
- how to send form data from client.


Resourses
[Common JS Modules](https://blog.tableflip.io/the-difference-between-module-exports-and-exports/#:~:text=exports%20is%20important.&text=What%20this%20means%20is%20that,to%20exports%20and%20not%20module.)

[Writing Middleware For Express](https://expressjs.com/en/guide/writing-middleware.html)