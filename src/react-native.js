import { fixupPluginRules } from "@eslint/compat";
import reactNative from "eslint-plugin-react-native";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-native": fixupPluginRules(reactNative),
    },
    rules: {
      ...reactNative.configs.all.rules,
    },
  },
];
