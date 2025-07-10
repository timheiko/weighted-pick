module.exports = {
  env: {
    browser: true,
    commonjs: false,
    es2021: true,
    jest: true
  },
  extends: 'standard',
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: [ 'error', 'always' ],
    "comma-dangle": ["error", {
        arrays: "always-multiline",
        objects: "never",
        imports: "never",
        exports: "never",
        functions: "always-multiline"
    }]
  }
}
