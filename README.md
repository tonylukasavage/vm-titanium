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

* `runInContext` and `runInNewContext` require you to use a callback (as shown in the usage above). This unfortunately means that this module cannot be be a drop-in replacement for for node.js's `vm` module for use with something like browserify. This is because there is no way to communicate between contexts in Titanium with aything other than [Ti.App](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.App) events, forcing the operations to be asynchronous. For the sake of uniformity, `runInThisContext` can also take a callback, but it is not required.
* The only reliable, cross-platform way to create a new context in Titanium (outside of native modules) is to open a new window with [createWindow](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI-method-createWindow) using the [url](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.Window-property-url) parameter. This has the unfortunate effect of opening a window. While I'm not sure if the window itself can be avoided (vm-browserify does something similar with iframes), it may be possible to make it non-visual. The obvious `visible:false` though does not seem to work.

