module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "parser": "babel-eslint",
    "extends": "airbnb",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "settings": {
        "react": {
          "version": "detect"
        }
    },
    "plugins": [
        "react"
    ],
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "react/prefer-stateless-function": 0,
        "react/jsx-filename-extension": 0,
        "import/no-unresolved": 0,
    }
};