#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const tree = require("./tree.js");
const organize = require("./organize.js");


let inputArr = process.argv.slice(2);
let command = inputArr[0];
let dirpath = process.cwd();

switch (command) {
  case "tree":
    tree.treeFn(dirpath);
    break;
  case "organize":
    organize.orgFn(dirpath);
    break;
  default:
    console.log("Please 🙏🙏🙏 give the correct input");
    break;
}
