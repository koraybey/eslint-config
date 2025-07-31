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
import seatbelt from 'eslint-seatbelt'
import globals from 'globals'
import path from 'node:path'

const baseRules = {
    complexity: ['error', 20],
    'no-var': 'error',
    'no-console': 'error',
    'no-unused-vars': 'off',
    'arrow-body-style': ['error', 'as-needed'],
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
    // Must be in line with complexity rule
    'sonarjs/cognitive-complexity': ['error', 20],
    'sonarjs/slow-regex': 'warn',
    'sonarjs/todo-tag': 'warn',
    'sonarjs/deprecation': 'warn',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-negated-condition': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/filename-case': 'off',
    'sonarjs/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/method-signature-style': 'error',
    // This rule is not compatible with CommonJS modules, which we use in some places: https://typescript-eslint.io/rules/no-require-imports/#usage-with-commonjs
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/ban-ts-comment': [
        'error',
        {
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': true,
            'ts-nocheck': true,
            'ts-check': false,
            minimumDescriptionLength: 3,
        },
    ],
    'functional/immutable-data': [
        'error',
        {
            ignoreAccessorPattern: [
                '**.current', // This is needed for React refs.
            ],
            ignoreMapsAndSets: true,
        },
    ],
    'functional/no-expression-statements': 'off',
    'functional/functional-parameters': 'off',
    'functional/no-return-void': 'off',
}

const typedRules = {
    '@typescript-eslint/consistent-type-exports': [
        'error',
        {
            fixMixedExportsWithInlineTypeSpecifier: true,
        },
    ],
    '@typescript-eslint/consistent-type-imports': [
        'error',
        {
            prefer: 'type-imports',
            disallowTypeAnnotations: true,
            fixStyle: 'inline-type-imports',
        },
    ],
    '@typescript-eslint/naming-convention': [
        'error',
        {
            selector: 'variableLike',
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
    ],
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/strict-boolean-expressions': [
        'error',
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
    '@typescript-eslint/require-array-sort-compare': [
        'error',
        { ignoreStringArrays: true },
    ],
    // Let's not enforce this rule this time around, it is too much noise in the codebase.
    // '@typescript-eslint/explicit-function-return-type': [
    //     'error',
    //     {
    //         allowExpressions: true,
    //         allowHigherOrderFunctions: true,
    //         allowTypedFunctionExpressions: true,
    //         allowDirectConstAssertionInArrowFunctions: true,
    //     },
    // ],
}

const reactRules = {
    ...reactHooks.configs['recommended-latest'].rules,
    ...reactNative.configs.all.rules,
    ...react.configs.recommended.rules,
    'react-hooks/react-compiler': 'error',
    'react-native/no-raw-text': [2, { skip: ['MText', 'Button', 'MButton'] }],
    'react/react-in-jsx-scope': 'off',
}

export default tseslint.config(
    { ignores: ['**/*.gen.*'] },
    {
        plugins: { 'eslint-seatbelt': seatbelt },
        rules: {
            'eslint-seatbelt/configure': [
                'error',
                {
                    seatbeltFile: path.resolve(
                        import.meta.dirname,
                        'eslint.seatbelt.tsv'
                    ),
                },
            ],
        },
        processor: seatbelt.processors.seatbelt,
    },
    eslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    importX.flatConfigs.recommended,
    sonarjs.configs.recommended,
    functional.configs.recommended,
    functional.configs.stylistic,
    // functional.configs.disableTypeChecked,
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
        rules: baseRules,
    },
    {
        extends: [
            importX.flatConfigs.typescript,
            // functional.configs.recommended,
            functional.configs.externalTypeScriptRecommended,
            tseslint.configs.strictTypeCheckedOnly,
            tseslint.configs.stylisticTypeCheckedOnly,
        ],
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: typedRules,
    },
    {
        files: ['**/*.tsx'],
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-native': fixupPluginRules(reactNative),
        },
        rules: reactRules,
    },
    {
        files: ['**/*.{spec,test}.{ts,tsx}'],
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
