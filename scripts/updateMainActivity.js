const fs = require("fs");
const path = require("path");

// Dossier de base où chercher le fichier MainActivity.java
const androidDir = path.join(__dirname, "../android");

// Chemin vers le fichier source contenant le nouveau contenu
const newContentPath = path.join(__dirname, "../resources/MainActivity.java");

// Fonction pour chercher MainActivity.java dans un répertoire et ses sous-répertoires
function findMainActivity(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      // Recherche récursive dans les sous-dossiers
      const result = findMainActivity(fullPath);
      if (result) return result;
    } else if (file === "MainActivity.java") {
      // Retourner le chemin complet si le fichier est trouvé
      return fullPath;
    }
  }
  return null; // Fichier non trouvé
}

// Rechercher MainActivity.java
const mainActivityPath = findMainActivity(androidDir);

if (!mainActivityPath) {
  console.error("MainActivity.java not found in the ./android directory.");
  process.exit(1);
}

// Lire le nouveau contenu depuis le fichier source
fs.readFile(newContentPath, "utf8", (err, newContent) => {
  if (err) {
    console.error("Error reading new MainActivity.java content:", err);
    process.exit(1);
  }

  // Lire le fichier existant MainActivity.java
  fs.readFile(mainActivityPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading MainActivity.java:", err);
      process.exit(1);
    }

    // Extraire la première ligne
    const firstLine = data.split("\n")[0];

    // Combiner la première ligne avec le nouveau contenu
    const updatedContent = `${firstLine}\n${newContent}`;

    // Écrire le contenu mis à jour dans MainActivity.java
    fs.writeFile(mainActivityPath, updatedContent, "utf8", (err) => {
      if (err) {
        console.error("Error writing MainActivity.java:", err);
        process.exit(1);
      }
      console.log(
        `MainActivity.java updated successfully at ${mainActivityPath}!`
      );
    });
  });
});
