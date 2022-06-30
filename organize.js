
const fs = require("fs");
const path = require("path");
const extn = require("./extns.js")

function organize(dirPath) {
  //   dirPath = process.cwd();
  if (dirPath == undefined) {
    console.log("Please enter the Path");
    return;
  } else {
    let isCorrectDir = fs.existsSync(dirPath);
    if (isCorrectDir) {
      let destPath = path.join(dirPath, "organized File");
      if (fs.existsSync(destPath) == false) {
        fs.mkdirSync(destPath);
      }
      organizeHelper(dirPath, destPath);
    } else {
      console.log("Please enter the valid Path");
      return;
    }
  }
}

function organizeHelper(dirPath, destPath) {
  let contents = fs.readdirSync(dirPath);
  for (let i = 0; i < contents.length; i++) {
    let filePath = path.join(dirPath, contents[i]);
    if (fs.lstatSync(filePath).isFile()) {
      let catFile = getExtension(filePath);
      let catDirPath = path.join(destPath, catFile);
      if (fs.existsSync(catDirPath) == false) {
        fs.mkdirSync(catDirPath);
      }
      let filename = path.basename(filePath);
      let destFilePath = path.join(catDirPath, filename);
      fs.copyFileSync(filePath, destFilePath);

      //   console.log(filePath,"-->",catFile);
      fs.unlinkSync(filePath);

      console.log(filename, "copied to", catFile, "folder");
    }
  }

  // console.log(fileName,"-->",extname);
}

function getExtension(filePath) {
  let fileExtn = path.extname(filePath);
  fileExtn = fileExtn.slice(1);

  for (let prop in extn.extname) {
    let catName = extn.extname[prop];
    for (let i = 0; i < catName.length; i++) {
      if (fileExtn == catName[i]) {
        return prop;
      }
    }
  }
  return "others";
}

module.exports={
    orgFn : organize
}
