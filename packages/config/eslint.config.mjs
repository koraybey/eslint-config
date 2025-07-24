import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vitest from '@vitest/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier'
import functional from 'eslint-plugin-functional'
import pluginPreferArrowFunctions from 'eslint-plugin-prefer-arrow-functions'
import sonarjs from 'eslint-plugin-sonarjs'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'
import { fixupPluginRules } from '@eslint/compat'
import { importX } from 'eslint-plugin-import-x'
import reactNative from 'eslint-plugin-react-native'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import pluginPromise from 'eslint-plugin-promise'
import globals from 'globals'

export default tseslint.config(
    eslint.configs.recommended,
    importX.flatConfigs.recommended,
    sonarjs.configs.recommended,
    functional.configs.recommended,
    functional.configs.disableTypeChecked,
    functional.configs.stylistic,
    pluginPromise.configs['flat/recommended'],
    eslintPluginUnicorn.configs.recommended,
    {
        plugins: {
            '@stylistic': stylistic,
            'prefer-arrow-functions': pluginPreferArrowFunctions,
            'unused-imports': unusedImports,
        },
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
        rules: {
            complexity: ['error', 20],
            'functional/immutable-data': [
                'error',
                {
                    ignoreMapsAndSets: true,
                },
            ],
            'no-magic-numbers': 'off',
            'no-unused-vars': 'off',
            'prefer-arrow-functions/prefer-arrow-functions': [
                'warn',
                {
                    allowedNames: [],
                    allowNamedFunctions: false,
                    allowObjectProperties: false,
                    classPropertiesAllowed: false,
                    disallowPrototype: false,
                    returnStyle: 'unchanged',
                    singleReturnOnly: false,
                },
            ],
            'sonarjs/cognitive-complexity': ['error', 20], // Must be in line with complexity rule
            'sonarjs/slow-regex': 'warn',
            'sonarjs/todo-tag': 'warn',
            'sonarjs/deprecation': 'warn',
            'unicorn/no-array-callback-reference': 'off',
            'unicorn/no-array-for-each': 'off',
            'unicorn/no-array-reduce': 'off',
            'unicorn/no-negated-condition': 'off',
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/filename-case': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                    vars: 'all',
                    varsIgnorePattern: '^_',
                },
            ],
        },
    },
    {
        extends: [
            tseslint.configs.strictTypeChecked,
            tseslint.configs.stylisticTypeChecked,
            importX.flatConfigs.typescript,
            functional.configs.externalTypeScriptRecommended,
        ],
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-magic-numbers': 'off',
            '@typescript-eslint/prefer-destructuring': 'off',
            'functional/no-expression-statements': [
                'error',
                { ignoreVoid: true },
            ],
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                projectService: true,
            },
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        files: ['**/*.{ts,tsx}'],
    },
    {
        files: ['**/*.tsx'],
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-native': fixupPluginRules(reactNative),
        },
        rules: {
            ...reactHooks.configs['recommended-latest'].rules,
            ...reactNative.configs.all.rules,
            ...react.configs.recommended.rules,
            'react-hooks/react-compiler': 'error',
            'react-native/no-raw-text': [2, { skip: ['MText'] }],
            'functional/functional-parameters': 'off',
        },
    },
    {
        files: ['**/*.{spec,test}.*'],
        plugins: {
            vitest,
        },
        rules: {
            ...vitest.configs.recommended.rules,
            'no-console': 'off',
        },
    },
    eslintConfigPrettier // Last to disable conflicting rules from other plugins
)
