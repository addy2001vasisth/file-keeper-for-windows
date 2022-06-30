
const fs = require("fs");
const path = require("path");

function tree(dirPath) {
  //   dirPath = process.cwd();

  if (dirPath == undefined) {
    console.log("Please Enter 🙏🙏 the Path");
    return;
  } else {
    if (fs.existsSync(dirPath) == false) {
      console.log("Please enter the valid Path");
      return;
    } else {
      treehelper("", dirPath);
    }
  }
}

function treehelper(indent, dirPath) {
  let name = path.basename(dirPath);
  let fiOrfo = fs.lstatSync(dirPath);
  if (fiOrfo.isFile()) {
    console.log(indent + "├──", name);
  } else {
    console.log(indent + "└──", name);
    let contents = fs.readdirSync(dirPath);

    for (let i = 0; i < contents.length; i++) {
      let dirContentPath = path.join(dirPath, contents[i]);
      treehelper(indent + "|\t", dirContentPath);
    }
  }
}

module.exports = {
    treeFn : tree
};
