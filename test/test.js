/**
 * Tests for fp-utils.js.
 */
const assert = require('assert');

const fp = require('../src/index.js');

describe('fp-utils', () => {
    describe('curry', () => {
        it('should return a curried function', () => {
            const add = fp.curry((a, b, c) => a + b + c);

            assert.equal(add(1, 2, 3), 6);
            assert.equal(add(1)(2, 3), 6);
            assert.equal(add(1, 2)(3), 6);
            assert.equal(add(1)(2)(3), 6);
        });
    });

    describe('reduce', () => {
        it('should concat strings from left to right', () => {
            const actual = fp.reduce((res, v) => res + v, '')(['a', 'b', 'c']);
            assert.equal(actual, 'abc');
        });
    });

    describe('reduceRight', () => {
        it('should concat strings from right to left', () => {
            const actual =
                fp.reduceRight((res, v) => res + v, '')(['a', 'b', 'c']);
            assert.equal(actual, 'cba');
        });
    });

    describe('compose', () => {
        it('should apply functions from right to left', () => {
            const foo = fp.compose((v) => 2 * v, (v) => v + 5);
            const actual = foo(10);
            assert.equal(actual, 30);
        });
    });

    describe('pipe', () => {
        it('should apply functions from left to right', () => {
            const foo = fp.pipe((v) => 2 * v, (v) => v + 5);
            const actual = foo(10);
            assert.equal(actual, 25);
        });
    });

    describe('map', () => {
        it('should apply the function to each item', () => {
            const exclaim = (v) => `${v}!`;
            const actual = fp.map(exclaim)(['a', 'b', 'c']);
            assert.deepEqual(actual, ['a!', 'b!', 'c!']);
        });
    });

    describe('filter', () => {
        it('should exclude items that do satisfy predicate', () => {
            const isEven = (v) => v % 2 === 0;
            const actual = fp.filter(isEven)([1, 2, 3]);
            assert.deepEqual(actual, [2]);
        });
    });

    describe('find', () => {
        it('should return the first item that satisfies the predicate', () => {
            const hasName = (v) => v.hasOwnProperty('name');
            const actual = fp.find(hasName)([
                {x: 5, y: 10},
                {name: 'foo'},
                {name: 'bar'},
            ]);
            assert.deepEqual(actual, {name: 'foo'});
        });
    });

    describe('findIndex', () => {
        it('returns index of the first item satisfying the predicate', () => {
            const hasName = (v) => v.hasOwnProperty('name');
            const actual = fp.findIndex(hasName)([
                {x: 5, y: 10},
                {name: 'foo'},
                {name: 'bar'},
            ]);
            assert.equal(actual, 1);
        });
    });

    describe('flatten', () => {
        it('should not change flat arrays', () => {
            const actual = fp.flatten(['a', 'b', 'c']);
            assert.deepEqual(actual, ['a', 'b', 'c']);
        });

        it('should ignore empty arrays', () => {
            const actual = fp.flatten(['a', 'b', 'c', []]);
            assert.deepEqual(actual, ['a', 'b', 'c']);
        });

        it('should flatten nested arrays', () => {
            const actual = fp.flatten([['a'], ['b', 'c']]);
            assert.deepEqual(actual, ['a', 'b', 'c']);
        });

        it('should flatten multiple levels of nested arrays', () => {
            const actual = fp.flatten([[[], ['a']], [['b', []], 'c']]);
            assert.deepEqual(actual, ['a', 'b', 'c']);
        });
    });

    describe('flatMap', () => {
        it('should map and then flatten', () => {
            const exclaim = (v) => `${v}!`;
            const actual = fp.flatMap(fp.map(exclaim))([['a'], ['b', 'c']]);
            assert.deepEqual(actual, ['a!', 'b!', 'c!']);
        });
    });

    describe('split', () => {
        it('should split a string based on a separator string', () => {
            const actual = fp.split('&')('x=5&y=10');
            assert.deepEqual(actual, ['x=5', 'y=10']);
        });

        it('should split a string based on a separator regex', () => {
            const actual = fp.split(/[&\=]/)('x=5&y=10');
            assert.deepEqual(actual, ['x', '5', 'y', '10']);
        });
    });

    describe('replace', () => {
        it('should replace the first instance of a string', () => {
            const actual = fp.replace('!', '?')('a!b!c!');
            assert.deepEqual(actual, 'a?b!c!');
        });

        it('should replace all instances of a global regex with', () => {
            const actual = fp.replace(/!/g, '?')('a!b!c!');
            assert.deepEqual(actual, 'a?b?c?');
        });
    });

    describe('remove', () => {
        it('should remove the first instance of a string', () => {
            const actual = fp.remove('!')('a!b!c!');
            assert.deepEqual(actual, 'ab!c!');
        });

        it('should remove all instances of a global regex with', () => {
            const actual = fp.remove(/!/g)('a!b!c!');
            assert.deepEqual(actual, 'abc');
        });
    });

    describe('prop', () => {
        it('should return the property of an object', () => {
            const actual = fp.prop('x')({x: 5, y: 10});
            assert.equal(actual, 5);
        });

        it('should return undefined if it does not exist', () => {
            const actual = fp.prop('z')({x: 5, y: 10});
            assert.equal(actual, undefined);
        });
    });

    describe('any', () => {
        it('should return true if any item satisfies the predicate', () => {
            const anyEven = fp.any((v) => v % 2 === 0);
            assert(anyEven([1, 2, 3]));
        });

        it('should return false if no item satisfies the predicate', () => {
            const anyEven = fp.any((v) => v % 2 === 0);
            assert.equal(anyEven([1, 3, 5]), false);
        });
    });

    describe('all', () => {
        it('should return true if all items satisfy the predicate', () => {
            const allEven = fp.all((v) => v % 2 === 0);
            assert(allEven([2, 4, 6]));
        });

        it('should return false if at least one item fails predicate', () => {
            const allEven = fp.all((v) => v % 2 === 0);
            assert.equal(allEven([2, 4, 5]), false);
        });
    });

    describe('none', () => {
        it('should return true if no items satisfy the predicate', () => {
            const noneEven = fp.none((v) => v % 2 === 0);
            assert(noneEven([1, 3, 5]));
        });

        it('returns false if at least one item satisfies predicate', () => {
            const noneEven = fp.none((v) => v % 2 === 0);
            assert.equal(noneEven([1, 3, 4]), false);
        });
    });

    describe('fromEntries', () => {
        it('should create an object from an array of entry pairs', () => {
            const obj = fp.fromEntries([['x', 5], ['y', 10]]);
            assert.deepEqual(obj, {x: 5, y: 10});
        });
    });

    describe('eq', () => {
        it('should provide same behavior as ===', () => {
            assert.equal(fp.eq(1, 1), true);
            assert.equal(fp.eq('1', '1'), true);
            assert.equal(fp.eq(1, '1'), false);
        });
    });

    describe('neq', () => {
        it('should provide the same behavior as !==', () => {
            assert.equal(fp.neq(1, 1), false);
            assert.equal(fp.neq('1', '1'), false);
            assert.equal(fp.neq(1, '1'), true);
        });
    });

    describe('length', () => {
        it('should return the length of an array', () => {
            assert.equal(fp.length([1, 2, 3]), 3);
            assert.equal(fp.length([]), 0);
        });
    });

    describe('id', () => {
        it('should return whatever value is passed to it', () => {
            const point = {x: 5, y: 10};
            assert.equal(fp.id(point), point);
        });
    });

    describe('last', () => {
        it('should return the last item in an array', () => {
            assert.equal(fp.last([1, 2, 3]), 3);
            assert.equal(fp.last([]), undefined);
        });
    });

    describe('propEq', () => {
        it('should return true if the prop exists and value matches', () => {
            const actual = fp.propEq('x', 5)({x: 5, y: 10});
            assert(actual);
        });

        it('should return false if the prop does not exist', () => {
            const actual = fp.propEq('z', 5)({x: 5, y: 10});
            assert.equal(actual, false);
        });

        it('should return false if the value does not match', () => {
            const actual = fp.propEq('z', 10)({x: 5, y: 10});
            assert.equal(actual, false);
        });
    });

    describe('sum', () => {
        it('should return the sum of all the numbers', () => {
            const actual = fp.sum([1, 2, 3]);
            assert.equal(actual, 6);
        });
    });

    describe('join', () => {
        it('should return a string of items joined by separator', () => {
            const actual = fp.join('|', [1, 2, 3]);
            assert.equal(actual, '1|2|3');
        });
    });

    describe('uniq', () => {
        it('should remove duplicate values from an array', () => {
            const actual = fp.uniq([1, 1, 2, 1]);
            assert.deepEqual(actual, [1, 2]);
        });
    });
});
