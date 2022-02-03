// node index.js path-to-directory prefix separator

const fs = require("fs");
const { join } = require("path");

let prefix = "",
  separator = "",
  fileExtension = "";

const rename = function (file, index) {
  let newName = prefix + separator + index + "." + file.fileName.split(".")[1];
  let newPath = join(file.directory, newName);

  try {
    fs.renameSync(file.fullPath, newPath);
    console.log(newPath);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

const files = [],
  dirs = [];

const iterateDir = (directory) => {
  try {
    let dirContent = fs.readdirSync(directory);
    dirContent.forEach((path) => {
      const fullPath = join(directory, path);

      if (fs.statSync(fullPath).isFile()) {
        if (!fileExtension || (fileExtension && path.includes(fileExtension))) {
          files.push({ directory, fullPath, fileName: path });
        }
      }
    });
  } catch (e) {
    console.log(e);
    return false;
  }
};

const start = function () {
  const path = process.argv[2];
  prefix = process.argv[3].toString();
  separator = process.argv[4] ? process.argv[4].toString().toLowerCase() : "-";
  fileExtension = process.argv[5]
    ? process.argv[5].toString().toLowerCase()
    : null;

  iterateDir(path);

  files.forEach((file, index) => {
    rename(file, index + 1);
  });

  console.log("\n\n---------DONE--------\n\n");
};

console.log("\n---------START--------\n\n");

start();
