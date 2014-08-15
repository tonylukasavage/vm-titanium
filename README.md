# vm-titanium

node.js [vm](http://nodejs.org/api/vm.html) implementation for Titanium. This code is based heavily on James Halliday's [vm-browserify](https://github.com/substack/vm-browserify), modified for creation of contexts within the Titanium runtime.

This is a **work-in-progress**; an **experimental** idea. This is still hacky/clunky, but I'm putting it here to get more eyes on it and see if others can divine more elegant solutions to the same problem. More specifically, anyone who can resolve any of the [caveats](caveats) below gets a digital high five.

## install

```bash
$ npm install vm-titanium
$ cp ./node_modules/vm-titanium/vm-titanium.js /path/to/titanium_project/Resources
$ cp ./node_modules/vm-titanium/__context.js /path/to/titanium_project/Resources
```

## supported on

So far this has only been tested on the following system, but it's likely to work in other configurations I just haven't tried yet. Log an [issue](https://github.com/tonylukasavage/vm-titanium/issues) if you have problems using it on any of Appcelerator's supported platforms.

* TiSDK 3.3.0+
* iOS 7.1
* iPhone simulator

## usage

```js
var vm = require('vm-titanium');

// essentially just an eval
vm.runInThisContext('1 + 2 + 3', function(err, result) {
	console.log(result); // prints "6"
});

// change/add values from context
var context = vm.createContext({ foo: 'unchanged' });
vm.runInContext('foo="changed";newvalue=123', context, function(err, result) {
	console.log(context.foo);      // prints "changed"
	console.log(context.newvalue); // prints 123
});

// Create and open a Titanium Window. See issue #4 for explanation of why
// Ti and Titanium are manually added to the sandbox.
var sandbox = {
	Ti: Ti,
	Titanium: Titanium
};
var code =
'var win = Ti.UI.createWindow();' +
'win.add(Ti.UI.createView({' +
'  height: Ti.Platform.displayCaps.platformHeight/2,' +
'  backgroundColor: "#00f"' +
'});'
'win.open();'

vm.runInNewContext(code, sandbox, function(err, result) {
	// do other stuff
});
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
* [[issue #4](https://github.com/tonylukasavage/vm-titanium/issues/4)]: Certain Titanium namespaces always need to be manually copied into the context/sandbox when using `runInContext` or `runInNewContext`. **(workaround in issue)**

