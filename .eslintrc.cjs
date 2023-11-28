module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["plugin:@typescript-eslint/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
};
