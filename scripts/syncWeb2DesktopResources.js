const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "../resources/web2desktop");
const targetImagesDir = path.join(__dirname, "../web2desktop/resources/images");
const targetSplashPath = path.join(__dirname, "../web2desktop/splash/splash.png");
const sourceConfigPath = path.join(sourceDir, "config.local.json");
const targetConfigPath = path.join(
  __dirname,
  "../web2desktop/src/config.local.json"
);
const imageFiles = [
  "icon.icns",
  "icon.ico",
  "icon.png",
  "icon@2x.png",
  "icon@3x.png",
];

function ensureDirectory(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(sourcePath, targetPath) {
  fs.copyFileSync(sourcePath, targetPath);
  console.log(`Copied ${sourcePath} to ${targetPath}`);
}

function syncImages() {
  if (!fs.existsSync(sourceDir)) {
    console.error(`Source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  ensureDirectory(targetImagesDir);

  for (const imageFile of imageFiles) {
    const sourcePath = path.join(sourceDir, imageFile);

    if (!fs.existsSync(sourcePath)) {
      console.error(`Image file not found: ${sourcePath}`);
      process.exit(1);
    }

    copyFile(sourcePath, path.join(targetImagesDir, imageFile));
  }
}

function syncSplash() {
  const sourceSplashPath = path.join(sourceDir, "splash.png");

  if (!fs.existsSync(sourceSplashPath)) {
    console.error(`Splash file not found: ${sourceSplashPath}`);
    process.exit(1);
  }

  ensureDirectory(path.dirname(targetSplashPath));
  copyFile(sourceSplashPath, targetSplashPath);
}

function syncConfig() {
  if (!fs.existsSync(sourceConfigPath)) {
    console.error(`Config file not found: ${sourceConfigPath}`);
    process.exit(1);
  }

  ensureDirectory(path.dirname(targetConfigPath));
  copyFile(sourceConfigPath, targetConfigPath);
}

syncImages();
syncSplash();
syncConfig();
console.log("Web2Desktop resources synced successfully!");
