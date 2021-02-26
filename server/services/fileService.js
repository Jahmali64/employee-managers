//read and write file

const fs = require('fs')
const path = require('path')

//create function to get file data
exports.getFileContents = (filePath)=>{
    let fileContents = JSON.parse(fs.readFileSync(path.join(__dirname, filePath)));
    return fileContents;
}

//create function to write to file data
exports.writeFileContents = (filePath, data) =>{
    let fileContents = JSON.parse(fs.readFileSync(path.join(__dirname, filePath)));
    fileContents.push(data);
    fileContents = JSON.stringify(fileContents);
    fs.writeFileSync(path.join(__dirname, filePath), fileContents);
}