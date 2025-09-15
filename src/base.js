import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import functional from "eslint-plugin-functional";
import { importX } from "eslint-plugin-import-x";
import pluginPreferArrowFunctions from "eslint-plugin-prefer-arrow-functions";
import pluginPromise from "eslint-plugin-promise";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sonarjs from "eslint-plugin-sonarjs";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

const baseRules = {
  complexity: ["error", 20],
  "no-var": "error",
  "no-console": "error",
  "arrow-body-style": ["error", "as-needed"],
  // eslint-plugin-simple-import-sort
  "simple-import-sort/imports": "error",
  "simple-import-sort/exports": "error",
  // eslint-plugin-unused-imports
  "unused-imports/no-unused-imports": "error",
  "unused-imports/no-unused-vars": [
    "warn",
    {
      args: "after-used",
      argsIgnorePattern: "^_",
      vars: "all",
      varsIgnorePattern: "^_",
    },
  ],
  // eslint-plugin-prefer-arrow-functions
  "prefer-arrow-functions/prefer-arrow-functions": [
    "warn",
    {
      allowedNames: [],
      allowNamedFunctions: false,
      allowObjectProperties: false,
      classPropertiesAllowed: false,
      disallowPrototype: false,
      returnStyle: "unchanged",
      singleReturnOnly: false,
    },
  ],
  // eslint-plugin-sonarjs overrides
  "sonarjs/cognitive-complexity": ["error", 20],
  "sonarjs/slow-regex": "warn",
  "sonarjs/todo-tag": "warn",
  "sonarjs/fixme-tag": "warn",
  "sonarjs/deprecation": "warn",
  "sonarjs/no-redundant-jump": "off",
  "sonarjs/no-unused-vars": "off", // handled by unused-imports
  // eslint-plugin-unicorn overrides
  "unicorn/no-array-callback-reference": "off",
  "unicorn/no-array-for-each": "off",
  "unicorn/no-array-reduce": "off",
  "unicorn/no-negated-condition": "off",
  "unicorn/prevent-abbreviations": "off",
  "unicorn/filename-case": "off",
};

export default [
  eslint.configs.recommended,
  importX.flatConfigs.recommended,
  sonarjs.configs.recommended,
  functional.configs.recommended,
  functional.configs.externalVanillaRecommended,
  functional.configs.disableTypeChecked,
  pluginPromise.configs["flat/recommended"],
  eslintPluginUnicorn.configs.recommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      "prefer-arrow-functions": pluginPreferArrowFunctions,
    },
    settings: { "import-x/core-modules": ["cloudflare:test"] },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node },
    },
    rules: baseRules,
  },
  // eslintConfigPrettier last to disable conflicts
  eslintConfigPrettier,
];
