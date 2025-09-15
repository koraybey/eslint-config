import tsParser from "@typescript-eslint/parser";
import functional from "eslint-plugin-functional";
import { importX } from "eslint-plugin-import-x";
import tseslint from "typescript-eslint";

const typescriptRules = {
  "functional/immutable-data": [
    "error",
    {
      ignoreMapsAndSets: true,
    },
  ],
  "functional/no-expression-statements": "off",
  "functional/functional-parameters": "off",
  "functional/no-return-void": "off",

  "@typescript-eslint/no-deprecated": "warn",
  "@typescript-eslint/consistent-type-exports": [
    "error",
    { fixMixedExportsWithInlineTypeSpecifier: true },
  ],
  "@typescript-eslint/consistent-type-imports": [
    "error",
    {
      prefer: "type-imports",
      disallowTypeAnnotations: true,
      fixStyle: "inline-type-imports",
    },
  ],
  "@typescript-eslint/naming-convention": [
    "error",
    {
      selector: "variableLike",
      leadingUnderscore: "allow",
      trailingUnderscore: "allow",
      format: ["camelCase", "PascalCase", "UPPER_CASE"],
    },
  ],
  "@typescript-eslint/promise-function-async": "error",
  "@typescript-eslint/strict-boolean-expressions": [
    "error",
    {
      allowString: false,
      allowNumber: false,
      allowNullableObject: false,
      allowNullableBoolean: false,
      allowNullableString: false,
      allowNullableNumber: false,
      allowAny: false,
    },
  ],
  "@typescript-eslint/require-array-sort-compare": [
    "error",
    { ignoreStringArrays: true },
  ],
  "@typescript-eslint/method-signature-style": "error",
  "@typescript-eslint/no-require-imports": "off",
  "@typescript-eslint/ban-ts-comment": [
    "error",
    {
      "ts-expect-error": "allow-with-description",
      "ts-ignore": true,
      "ts-nocheck": true,
      "ts-check": false,
      minimumDescriptionLength: 3,
    },
  ],
};

export default [
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      importX.flatConfigs.typescript,
      functional.configs.recommended,
      functional.configs.stylistic,
      functional.configs.externalTypeScriptRecommended,
      tseslint.configs.strictTypeCheckedOnly,
      tseslint.configs.stylisticTypeCheckedOnly,
    ],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        projectService: true,
      },
    },
    rules: typescriptRules,
  },
];
