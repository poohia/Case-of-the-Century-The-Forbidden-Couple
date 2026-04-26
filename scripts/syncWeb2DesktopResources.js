const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "../resources/web2desktop");
const targetImagesDir = path.join(__dirname, "../web2desktop/resources/images");
const sourceConfigPath = path.join(sourceDir, "config.local.json");
const targetConfigPath = path.join(
  __dirname,
  "../web2desktop/src/config.local.json"
);
const imageExtensions = new Set([
  ".apng",
  ".avif",
  ".bmp",
  ".gif",
  ".icns",
  ".ico",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".webp",
]);

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

  const files = fs.readdirSync(sourceDir, { withFileTypes: true });
  const imageFiles = files.filter(
    (file) =>
      file.isFile() &&
      imageExtensions.has(path.extname(file.name).toLowerCase())
  );

  for (const imageFile of imageFiles) {
    copyFile(
      path.join(sourceDir, imageFile.name),
      path.join(targetImagesDir, imageFile.name)
    );
  }
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
syncConfig();
console.log("Web2Desktop resources synced successfully!");
