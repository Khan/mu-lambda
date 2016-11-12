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

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	/**
	 * A very small library of helpful functional programming methods.
	 *
	 * Temporary docs: http://ramdajs.com/docs/.
	 */

	// curry :: (* -> a) -> (* -> a)
	var curry = function curry(f) {
	    return function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        return f.length > args.length
	        // bind returns a function with the correct number of parameters
	        ? curry(f.bind.apply(f, [null].concat(args))) : f.apply(undefined, args);
	    };
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

	// any :: (a -> Boolean) -> [a] -> Boolean
	var any = curry(function (f, arr) {
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
	    return reduce(function (obj, _ref) {
	        var _ref2 = _slicedToArray(_ref, 2),
	            k = _ref2[0],
	            v = _ref2[1];

	        return obj[k] = v, obj;
	    }, {}, entries);
	};

	// sum :: [Number] -> Number
	var sum = function sum(arr) {
	    return reduce(function (res, v) {
	        return res + v;
	    }, 0, arr);
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
	    any: any,
	    compose: compose,
	    curry: curry,
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
	    sum: sum,
	    uniq: uniq
	};

/***/ }
/******/ ]);