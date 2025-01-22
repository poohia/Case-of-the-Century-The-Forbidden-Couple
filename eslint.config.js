// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const pluginReact = require("eslint-plugin-react");
const pluginPrettier = require("eslint-plugin-prettier");
const pluginImport = require("eslint-plugin-import");
const typescriptEslintParser = require("@typescript-eslint/eslint-plugin");

module.exports = tseslint.config({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      project: "./tsconfig.json",
    },
  },
  files: ["**/*.ts", "**/*.tsx"],
  ignores: ["./vite.config.js"],
  plugins: { import: pluginImport, prettier: pluginPrettier },
  extends: [
    eslint.configs.recommended,
    {
      rules: pluginImport.flatConfigs?.recommended.rules,
    },
    // ...pluginImport.flatConfigs?.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    pluginReact.configs.flat.recommended,
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": ["warn"],
    "react/react-in-jsx-scope": ["off"],
    "@typescript-eslint/consistent-type-definitions": ["off"],
    "import/no-unresolved": "off",
    "import/order": [
      "error",
      {
        groups: [
          ["builtin", "external"],
          ["internal", "parent", "sibling", "index"],
        ],
        "newlines-between": "always",
      },
    ],
    "import/named": ["warn"],
    "import/namespace": ["off"],
    "prettier/prettier": [
      "error",
      {
        singleQuote: false, // Utilise des guillemets doubles
        semi: true, // Ajoute des points-virgules à la fin des lignes
        endOfLine: "auto", // Maintient les fins de ligne en fonction du système
        tabWidth: 2, // Définit la largeur de la tabulation à 2 espaces
        trailingComma: "es5", // Ajoute des virgules en fin de ligne pour ES5 (objets, tableaux, etc.)
        printWidth: 80, // Définit la longueur de ligne maximale à 80 caractères
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "all",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    curly: ["error", "all"],
    "@typescript-eslint/no-duplicate-enum-values": ["warn"],
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": ["warn"],
  },
});
