/* 
    Login Service Will Authenticate an email and password
    return a true or false response.
    false returns will keep users on the login page with errors
    true will redirect user to the dashboard.html
*/

//import fileService
const fileService = require('./fileService')

exports.authenticate = (credential)=>{
    const {email, password} = {...credential}
    const users = fileService.getFileContents('../data/users.json');

    //authUser = {validEmail, validPassword, user}
    const authUser = users.reduce((authObj, user)=>{
        //authentication check for email
        if(user.email === email){
            authObj.validEmail = true;
        }
        //authentication check for password
        if(user.password === password){
            authObj.validPassword = true;
        }
        //authentication check for user
        if(authObj.validEmail === true && authObj.validPassword === true){
            authObj.user = user;
        }

        return authObj;

    }, {validEmail:false, validPassword:false, user:null})

    //ternary operator to return user if true or return error messages if false
    const auth0 = authUser.user ? authUser.user : formatErrors(authUser);
    return auth0;
}

//error function to create errors warning for each field
const formatErrors = function(authObj){
    //create error warning
    let emailWarning = "";
    let passwordWarning = "";

    //warning message for email
    if(authObj.validEmail === false){
        emailWarning = "Invalid email entry. Please try again.";
    }

    //warning message for password
    if(authObj.validPassword === false){
        passwordWarning = "Password does not match. Please try again.";
    }

    return {user:null, emailWarning, passwordWarning}
}