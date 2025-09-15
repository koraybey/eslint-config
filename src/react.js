import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

const reactRules = {
  ...reactHooks.configs["recommended-latest"].rules,
  ...react.configs.recommended.rules,
  "react-hooks/react-compiler": "error",
  "react/react-in-jsx-scope": "off",
};

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { react, "react-hooks": reactHooks },
    rules: reactRules,
  },
];
