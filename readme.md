![Travis (.com)](https://img.shields.io/travis/com/t0ri/autocomplete)
![Coveralls github](https://img.shields.io/coveralls/github/t0ri/autocomplete)
![GitHub last commit](https://img.shields.io/github/last-commit/t0ri/autocomplete)

<p align="center">
  <img src="./img/header.png" alt="@t0ri/autocomplete hero img">
</p>

# Autocompletion Library
This autocompletion library is loosely-coupled from the DOM and other dependencies, making it a lightweight lightning-fast solution to autocomplete.  It can be used in Node or in the browser.

[View NPM Package here.](https://www.npmjs.com/package/@t0ri/autocomplete)


[View demo here.](https://t0ri.github.io/autocomplete-demo/)

## Features
- utilizes an internal trie to process data
- options to ignoreCasing and return only a certain amount of strings
- loosely coupled for functionality server-side and in the browser

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Browser Installation
Install the library into your project.
```
npm install @t0ri/autocomplete --save
```

Import the library content into a JS file using ES6 import syntax at the top of your file.
```
import Autocomplete from './node_modules/@t0ri/autocomplete/esm/autocomplete.js'
```

## To Do
- autocomplete() stops traversal once length of returned array hits `this.autocompleteCount`
- preserve casing for return when `this.ignoreCasing` is true (rewrite method non-destructively)
- expand documentation
