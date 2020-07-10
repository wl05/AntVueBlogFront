module.exports = {
  extends: "eslint-config-egg",
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0,
    'array-bracket-spacing': 0,
    'indent': ['error', 2]
  },
  "parser": "babel-eslint"
}
