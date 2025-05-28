const { compat } = require("eslint-config-prettier");

module.exports = {
  extends: [
    "next/core-web-vitals",
    "next",
    "plugin:@typescript-eslint/recommended",
    ...compat.extends(), // only if you're using eslint-config-prettier compat layer
  ],
  rules: {
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@next/next/no-page-custom-font": "off",
  },
};
