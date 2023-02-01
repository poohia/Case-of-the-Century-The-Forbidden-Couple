const path = require("path");
const { exec } = require("child_process");

function execBuildResources() {
  return new Promise((resolve, reject) => {
    const cordovaResPath = path.resolve(
      process.cwd(),
      "./node_modules/cordova-res/bin/cordova-res"
    );
    exec(`node ${cordovaResPath}`, (error) => {
      if (error) {
        reject();
        return;
      }
      resolve();
    });
  });
}

module.exports = execBuildResources;
