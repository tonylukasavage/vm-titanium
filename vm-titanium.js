var indexOf = Array.prototype.indexOf;

var Object_keys = function (obj) {
	if (Object.keys) return Object.keys(obj)
	else {
		var res = [];
		for (var key in obj) res.push(key)
		return res;
	}
};

var forEach = function (xs, fn) {
	if (xs.forEach) return xs.forEach(fn)
	else for (var i = 0; i < xs.length; i++) {
		fn(xs[i], i, xs);
	}
};

var defineProp = (function() {
	try {
		Object.defineProperty({}, '_', {});
		return function(obj, name, value) {
			Object.defineProperty(obj, name, {
				writable: true,
				enumerable: false,
				configurable: true,
				value: value
			})
		};
	} catch(e) {
		return function(obj, name, value) {
			obj[name] = value;
		};
	}
}());

var globals = ['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function',
'Infinity', 'JSON', 'Math', 'NaN', 'Number', 'Object', 'RangeError',
'ReferenceError', 'RegExp', 'String', 'SyntaxError', 'TypeError', 'URIError',
'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'escape',
'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'undefined', 'unescape'];

function Context() {}
Context.prototype = {};

var Script = exports.Script = function NodeScript (code) {
	if (!(this instanceof Script)) return new Script(code);
	this.code = code;
};

Script.prototype.runInContext = function (context, callback) {
	if (!(context instanceof Context)) {
		throw new TypeError("needs a 'context' argument.");
	}
	if (!callback) {
		throw new Error("needs a 'callback' argument.");
	}

	var self = this,
		win = Ti.UI.createWindow({ url: '__context.js' });

	win.addEventListener('open', function(e) {
		var newContext = win.__triple.context(),
			newEval = win.__triple.eval;

		forEach(Object_keys(context), function (key) {
			newContext[key] = context[key];
		});
		forEach(globals, function (key) {
			if (context[key]) {
				newContext[key] = context[key];
			}
		});

		var winKeys = Object_keys(newContext);

		var res = newEval.call(newContext, self.code);

		forEach(Object_keys(newContext), function (key) {
			if (key in context || indexOf(winKeys, key) === -1) {
				context[key] = newContext[key];
			}
		});

		forEach(globals, function (key) {
			if (!(key in context)) {
				defineProp(context, key, newContext[key]);
			}
		});

		win.close();

		return callback && callback(null, res);
	});

	win.open();
};

Script.prototype.runInThisContext = function (callback) {
	var res = eval(this.code);
	if (callback) {
		return callback(null, res);
	} else {
		return res;
	}
};

Script.prototype.runInNewContext = function (context, callback) {
	if (typeof context === 'function') {
		callback = context;
		context = {};
	}

	var ctx = Script.createContext(context);
	var res = this.runInContext(ctx, function(err, res) {
		forEach(Object_keys(ctx), function (key) {
			context[key] = ctx[key];
		});

		return callback(err, res);
	});
};

forEach(Object_keys(Script.prototype), function (name) {
	exports[name] = Script[name] = function (code) {
		var s = Script(code);
		return s[name].apply(s, [].slice.call(arguments, 1));
	};
});

exports.createScript = function (code) {
	return exports.Script(code);
};

exports.createContext = Script.createContext = function (context) {
	var copy = new Context();
	if(typeof context === 'object') {
		forEach(Object_keys(context), function (key) {
			copy[key] = context[key];
		});
	}
	return copy;
};