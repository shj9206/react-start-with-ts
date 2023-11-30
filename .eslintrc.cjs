// module.exports = {
//   root: true,
//   env: { browser: true, es2020: true },
//   extends: ["plugin:@typescript-eslint/recommended"],
//   ignorePatterns: ["dist", ".eslintrc.cjs"],
//   parser: "@typescript-eslint/parser",
//   plugins: ["@typescript-eslint"],
// };
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "import/extensions": "off",
    "max-len": ["error", { code: 130 }],
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["vite.config.ts"] },
    ],
  },
};
