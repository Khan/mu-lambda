module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * A very small library of helpful functional programming methods.
	 *
	 * Temporary docs: http://ramdajs.com/docs/.
	 */

	var arity = function arity(n, fn) {
	    switch (n) {
	        case 0:
	            return function () {
	                return fn.apply(null, arguments);
	            };
	        case 1:
	            return function (a) {
	                return fn.apply(null, arguments);
	            };
	        case 2:
	            return function (a, b) {
	                return fn.apply(null, arguments);
	            };
	        case 3:
	            return function (a, b, c) {
	                return fn.apply(null, arguments);
	            };
	        case 4:
	            return function (a, b, c, d) {
	                return fn.apply(null, arguments);
	            };
	        case 5:
	            return function (a, b, c, d, e) {
	                return fn.apply(null, arguments);
	            };
	        default:
	            {
	                var args = [];
	                for (var i = 0; i < n; i++) {
	                    args.push('arg' + i);
	                }
	                args.push('return fn.apply(null, arguments)');
	                return new (Function.prototype.bind.apply(Function, [null].concat(args)))();
	            }
	    }
	};

	var _curryN = function _curryN(n, received, fn) {
	    return function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        var combined = received.concat(args);
	        var left = n - combined.length;
	        return left <= 0 ? fn.apply(undefined, _toConsumableArray(combined)) : arity(left, _curryN(n, combined, fn));
	    };
	};

	// curryN :: Number -> (* -> a) -> (* -> a)
	var curryN = function curryN(n, fn) {
	    return arity(n, _curryN(n, [], fn));
	};

	// curry :: (* -> a) -> (* -> a)
	var curry = function curry(fn) {
	    return curryN(fn.length, fn);
	};

	// reduce :: ((a, b) -> a) -> a -> [b] -> a
	var reduce = curry(function (f, init, arr) {
	    return arr.reduce(f, init);
	});

	// reduceRight :: ((a, b) -> a) -> a -> [b] -> a
	var reduceRight = curry(function (f, init, arr) {
	    return arr.reduceRight(f, init);
	});

	// compose :: Function f => [f] -> (a -> b)
	var compose = function compose() {
	    for (var _len2 = arguments.length, farr = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        farr[_key2] = arguments[_key2];
	    }

	    return function (x) {
	        return farr.reduceRight(function (v, f) {
	            return f(v);
	        }, x);
	    };
	};

	// pipe :: Function f => [f] -> (a -> b)
	var pipe = function pipe() {
	    for (var _len3 = arguments.length, farr = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        farr[_key3] = arguments[_key3];
	    }

	    return function (x) {
	        return farr.reduce(function (v, f) {
	            return f(v);
	        }, x);
	    };
	};

	// map :: (a -> b) -> [a] -> [b]
	var map = curry(function (f, arr) {
	    return arr.map(f);
	});

	// filter :: (a -> Boolean) -> [a] -> [a]
	var filter = curry(function (f, arr) {
	    return arr.filter(f);
	});

	// find :: (a -> Boolean) -> [a] -> a
	var find = curry(function (f, arr) {
	    return arr.find(f);
	});

	// findIndex :: (a -> Boolean) -> [a] -> Number
	var findIndex = curry(function (f, arr) {
	    return arr.findIndex(f);
	});

	// flatten :: [a] -> [b]
	var flatten = reduce(function (res, v) {
	    return res.concat(Array.isArray(v) ? flatten(v) : [v]);
	}, []);

	// flatMap :: (a -> [b]) -> [a] -> [b]
	var flatMap = curry(function (f, arr) {
	    return compose(flatten, map(f))(arr);
	});

	// all :: (a -> Boolean) -> [a] -> Boolean
	var all = curry(function (f, arr) {
	    return reduce(function (res, v) {
	        return res && f(v);
	    }, true, arr);
	});

	// none :: (a -> Boolean) -> [a] -> Boolean
	var none = curry(function (f, arr) {
	    return !reduce(function (res, v) {
	        return res || f(v);
	    }, false, arr);
	});

	// some :: (a -> Boolean) -> [a] -> Boolean
	var some = curry(function (f, arr) {
	    return reduce(function (res, v) {
	        return res || f(v);
	    }, false, arr);
	});

	// split :: (String | RegExp) -> String -> [String]
	var split = curry(function (splitOn, str) {
	    return str.split(splitOn);
	});

	// replace :: (String | RegExp) -> String -> String
	var replace = curry(function (s, r, str) {
	    return str.replace(s, r);
	});

	// remove :: String a => a -> a -> a
	var remove = curry(function (s, str) {
	    return replace(s, '')(str);
	});

	// eq :: a -> b -> Boolean
	// NOTE: shallow equals
	var eq = curry(function (a, b) {
	    return a === b;
	});

	// neq :: a -> b -> Boolean
	// NOTE: shallow not equals
	var neq = curry(function (a, b) {
	    return a !== b;
	});

	// prop :: s -> {s: a} -> a | Undefined
	var prop = curry(function (k, obj) {
	    return obj[k];
	});

	// propEq :: String -> a -> Object -> Boolean
	var propEq = curry(function (k, v, obj) {
	    return compose(eq(v), prop(k))(obj);
	});

	// last :: [a] -> a
	var last = function last(arr) {
	    return arr[arr.length - 1];
	};

	// first :: [a] -> a
	var first = function first(arr) {
	    return arr[0];
	};

	// id :: a -> a
	var id = function id(a) {
	    return a;
	};

	// length :: [a] -> Number
	var length = function length(arr) {
	    return arr.length;
	};

	// fromEntries :: [[k,v]] → {k: v}
	var fromEntries = function fromEntries(entries) {
	    return reduce(function (obj, entry) {
	        return obj[entry[0]] = entry[1], obj;
	    }, {}, entries);
	};

	// sum :: [Number] -> Number
	var sum = function sum(arr) {
	    return reduce(function (res, v) {
	        return res + v;
	    }, 0, arr);
	};

	// tap :: fn -> a -> a
	var tap = curry(function (fn, a) {
	    return fn(a), a;
	});

	// log :: a -> void
	var log = function log(a) {
	    return console.log(a);
	};

	// join :: String -> [a] -> String
	var join = curry(function (s, arr) {
	    return arr.join(s);
	});

	// uniq :: [a] -> [a]
	// NOTE: doesn't handle structures
	var uniq = function uniq(arr) {
	    return reduce(function (res, v) {
	        return res.indexOf(v) !== -1 ? res : (res.push(v), res);
	    }, [], arr);
	};

	module.exports = {
	    all: all,
	    some: some,
	    compose: compose,
	    curry: curry,
	    curryN: curryN,
	    eq: eq,
	    filter: filter,
	    find: find,
	    findIndex: findIndex,
	    first: first,
	    flatMap: flatMap,
	    flatten: flatten,
	    fromEntries: fromEntries,
	    fromPairs: fromEntries,
	    id: id,
	    identity: id,
	    join: join,
	    last: last,
	    length: length,
	    log: log,
	    map: map,
	    neq: neq,
	    none: none,
	    pipe: pipe,
	    prop: prop,
	    propEq: propEq,
	    reduce: reduce,
	    reduceRight: reduceRight,
	    remove: remove,
	    replace: replace,
	    split: split,
	    tap: tap,
	    sum: sum,
	    uniq: uniq
	};

/***/ }
/******/ ]);