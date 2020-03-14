module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    ecmaFeatures: { jsx: true }
  },
  env: {
    node: true
  },
  plugins: ["react", "prettier"],
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "prettier/prettier": "error",
    "react/prop-types": ["error", { skipUndeclared: true }]
  }
};
