/**
 * A very small library of helpful functional programming methods.
 *
 * Temporary docs: http://ramdajs.com/docs/.
 */

const arity = (n, fn) => {
    switch (n) {
        case 0: return function() { return fn.apply(null, arguments) };
        case 1: return function(a) { return fn.apply(null, arguments) };
        case 2: return function(a, b) { return fn.apply(null, arguments) };
        case 3: return function(a, b, c) { return fn.apply(null, arguments) };
        case 4: return function(a, b, c, d) { return fn.apply(null, arguments) };
        case 5: return function(a, b, c, d, e) { return fn.apply(null, arguments) };
        default: {
            const args = [];
            for (let i = 0; i < n; i++) {
                args.push(`arg${i}`);
            }
            args.push('return fn.apply(null, arguments)');
            return new Function(...args);
        }
    }
}

const _curryN = (n, received, fn) =>
    (...args) => {
        const combined = received.concat(args);
        const left = n - combined.length;
        return left <= 0
            ? fn(...combined)
            : arity(left, _curryN(n, combined, fn));
    };

// curryN :: Number -> (* -> a) -> (* -> a)
const curryN = (n, fn) => arity(n, _curryN(n, [], fn));

// curry :: (* -> a) -> (* -> a)
const curry = (fn) => curryN(fn.length, fn);

// reduce :: ((a, b) -> a) -> a -> [b] -> a
const reduce = curry((f, init, arr) => arr.reduce(f, init));

// reduceRight :: ((a, b) -> a) -> a -> [b] -> a
const reduceRight = curry((f, init, arr) => arr.reduceRight(f, init));

// compose :: Function f => [f] -> (a -> b)
const compose = (...farr) => x => farr.reduceRight((v, f) => f(v), x);

// pipe :: Function f => [f] -> (a -> b)
const pipe = (...farr) => x => farr.reduce((v, f) => f(v), x);

// map :: (a -> b) -> [a] -> [b]
const map = curry((f, arr) => arr.map(f));

// filter :: (a -> Boolean) -> [a] -> [a]
const filter = curry((f, arr) => arr.filter(f));

// find :: (a -> Boolean) -> [a] -> a
const find = curry((f, arr) => arr.find(f));

// findIndex :: (a -> Boolean) -> [a] -> Number
const findIndex = curry((f, arr) => arr.findIndex(f));

// flatten :: [a] -> [b]
const flatten = reduce(
    (res, v) => res.concat(Array.isArray(v) ? flatten(v) : [v]), []);

// flatMap :: (a -> [b]) -> [a] -> [b]
const flatMap = curry((f, arr) => compose(flatten, map(f))(arr));

// all :: (a -> Boolean) -> [a] -> Boolean
const all = curry((f, arr) => reduce((res, v) => res && f(v), true, arr));

// none :: (a -> Boolean) -> [a] -> Boolean
const none = curry((f, arr) => !reduce((res, v) => res || f(v), false, arr));

// any :: (a -> Boolean) -> [a] -> Boolean
const any = curry((f, arr) => reduce((res, v) => res || f(v), false, arr));

// split :: (String | RegExp) -> String -> [String]
const split = curry((splitOn, str) => str.split(splitOn));

// replace :: (String | RegExp) -> String -> String
const replace = curry((s, r, str) => str.replace(s, r));

// remove :: String a => a -> a -> a
const remove = curry((s, str) => replace(s, '')(str));

// eq :: a -> b -> Boolean
// NOTE: shallow equals
const eq = curry((a, b) => a === b);

// neq :: a -> b -> Boolean
// NOTE: shallow not equals
const neq = curry((a, b) => a !== b);

// prop :: s -> {s: a} -> a | Undefined
const prop = curry((k, obj) => obj[k]);

// propEq :: String -> a -> Object -> Boolean
const propEq = curry((k, v, obj) => compose(eq(v), prop(k))(obj));

// last :: [a] -> a
const last = (arr) => arr[arr.length - 1];

// first :: [a] -> a
const first = (arr) => arr[0];

// id :: a -> a
const id = (a) => a;

// length :: [a] -> Number
const length = (arr) => arr.length;

// fromEntries :: [[k,v]] → {k: v}
const fromEntries =
    (entries) => reduce((obj, entry) => (obj[entry[0]] = entry[1], obj), {}, entries);

// sum :: [Number] -> Number
const sum = (arr) => reduce((res, v) => res + v, 0, arr);

// tap :: fn -> a -> a
const tap = curry((fn, a) => (fn(a), a));

// log :: a -> void
const log = (a) => console.log(a);

// join :: String -> [a] -> String
const join = curry((s, arr) => arr.join(s));

// uniq :: [a] -> [a]
// NOTE: doesn't handle structures
const uniq = (arr) => reduce(
    (res, v) => res.indexOf(v) !== -1 ? res : (res.push(v), res), [], arr);

module.exports = {
    all,
    any,
    compose,
    curry,
    curryN,
    eq,
    filter,
    find,
    findIndex,
    first,
    flatMap,
    flatten,
    fromEntries,
    fromPairs: fromEntries,
    id,
    identity: id,
    join,
    last,
    length,
    log,
    map,
    neq,
    none,
    pipe,
    prop,
    propEq,
    reduce,
    reduceRight,
    remove,
    replace,
    split,
    tap,
    sum,
    uniq,
};
