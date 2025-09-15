import vitest from "@vitest/eslint-plugin";

export default [
  {
    files: ["**/*.{spec,test}.{js,jsx,ts,tsx}"],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      "no-console": "off",
    },
  },
];
