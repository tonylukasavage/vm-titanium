# vm-titanium

node.js [vm](http://nodejs.org/api/vm.html) implementation for Titanium. This code is based heavily on James Halliday's [vm-browserify](https://github.com/substack/vm-browserify), modified for creation of contexts within the Titanium runtime.

This is a **work-in-progress**; an **experimental** idea. This is still hacky/clunky, but I'm putting it here to get more eyes on it and see if others can divine more elegant solutions to the same problem. More specifically, anyone who can resolve any of the [caveats](caveats) below gets a digital high five.

## install

```bash
$ npm install vm-titanium
$ cp ./node_modules/vm-titanium/vm-titanium.js /path/to/titanium/Resources
$ cp ./node_modules/vm-titanium/__context.js /path/to/titanium/Resources
```

## usage

```js
var vm = require('vm-titanium');

vm.runInNewContext('1 + 2 + 3', function(err, result) {
	console.log(result); // prints "6"
});

vm.runInContext('1 + 2 + 3', vm.createContext(), function(err, result) {
	console.log(result); // prints "6"
});

// runInThisContext can be async
vm.runInThisContext('1 + 2 + 3', function(err, result) {
	console.log(result); // prints "6"
});

// ...or sync
vm.runInNewContext('1 + 2 + 3'); // returns 6
```

## testing

```bash
# unit tests and linting
$ grunt
```

## caveats

Not sure if these are surmountable, but take a look at the issue details if you're feeling brave.

* [[issue #2](https://github.com/tonylukasavage/vm-titanium/issues/2)]: `runInContext` and `runInNewContext` require you to use a callback, making them unsuitable as drop-in replacements for node.js's synchronous implementations.
* [[issue #3](https://github.com/tonylukasavage/vm-titanium/issues/3)]: Window created when creating a new context is visible, but shouldn't be.

