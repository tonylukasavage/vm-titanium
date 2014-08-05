# vm-titanium

node.js [vm](http://nodejs.org/api/vm.html) implementation for Titanium. This code is based heavily on James Halliday's [vm-browserify](https://github.com/substack/vm-browserify), modified only slightly for creation of contexts within the Titanium runtime.

# usage

```js
var vm = require('vm-titanium');

vm.runInNewContext('1 + 2 + 3', function(err, result) {
	console.log(result); // prints "6"
});
```

