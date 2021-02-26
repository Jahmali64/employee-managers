/* 
    Signup Service Will Authenticate that a user nam, email and password has been entered
    return a true or false response.
    false returns will keep users on the signup page with errors
    true will add user data to json file and redirect user to the login page
*/

//import fileService
const fileService = require('./fileService')

//import uniqueID
const {v4:uuidv4} = require("uuid");

exports.authenticate = (credential)=>{
    //get reference to user inserted data
    const {fullName, email, password, userId} = {...credential};
    //create object variable to hold data to be stored in json file
    let newUser = {fullName, email, password, userId};
    //create object variable to check for errors
    let errorObj = {nameError:false, emailError:false, passwordError:false, userId:null};

    //validates user full name
    if(fullName !== ""){
        newUser.fullName = fullName;
    }else{
        errorObj.nameError = true;
    }
    //validates user email
    if(email !== ""){
        newUser.email = email;
    }else{
        errorObj.emailError = true;
    }
    //validates user password
    if(password !== ""){
        newUser.password = password;
    }else{
        errorObj.passwordError = true;
    }

    //validates that all the info entered is good and throws errors messages if its not
    if(errorObj.nameError === false && errorObj.emailError === false && errorObj.passwordError === false){
        errorObj.userId = 1;
    }else{
        errorObj.nameError = "Name is required.";
        errorObj.emailError = "Email is required.";
        errorObj.passwordError = "Password is required.";
    }

    //uses one of the errorObj property to validate that the info is good then create a new userId and input data into the json file
    if(errorObj.userId === 1){
        newUser.userId = uuidv4();
        const newUserInfo = fileService.writeFileContents("../data/users.json", newUser);
        return newUserInfo;
    }

    //returns errorObj if info is bad
    return errorObj;
}