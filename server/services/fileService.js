//read and write file

const fs = require('fs')
const path = require('path')

//get files
exports.getFileContents = (filePath)=>{
    let fileContents = JSON.parse(fs.readFileSync(path.join(__dirname, filePath)));
    return fileContents;
}

//write to files
exports.writeFileContents = (filePath, data) =>{
    let fileContents = getFileContents(filePath);
    fileContents.push(data);
    fileContents = JSON.stringify(fileContents);
    fs.writeFileSync(path.join(__dirname, filePath), fileContents);
}