# matchex
[![Build Status](https://travis-ci.org/hillmanov/matchex.svg?branch=master)](https://travis-ci.org/hillmanov/matchex)
Match regular expressions in a routers like way

# Usage: 
```javascript
const Matchex = require('matchex');
const matchex = new Matchex();

matchex.use('Match (.*) you want with matchex!', (all, word) => {
  console.log(all); // Match anything you want with matchex!
  console.log(word); // anything
});

matchex.run('Match anything you want with matchex!');
```

You can pass in an `options` parameter to `use` to make the matching case insensitive:

```javascript
matchex.use('MATCH (.*) you WANT with matchex!', (all, word) => {
  console.log(all); // Match anything you want with matchex!
  console.log(word); // anything
}, { caseInsentive: true });

matchex.run('Match anything you want with matchex!');
```


