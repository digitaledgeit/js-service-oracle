var assert = require('assert');
var Locator = require('..');

describe('servicelocator', function() {

	describe('.has()', function() {

	});

	describe('.new()', function() {

		it('should return a new instance each time', function() {

			var locator = Locator().factory('rand', function() {
				return new Number(Math.random()*100);
			});

			assert.notEqual(locator.new('rand'), locator.new('rand'));

		});

	});

	describe('.get()', function() {

		it('should return the same instance each time', function() {

			var locator = Locator().factory('rand', function() {
				return new Number(Math.random()*100);
			});

			assert.equal(locator.get('rand'), locator.get('rand'));

		});

		it('should throw an error if I a factory module doesn\'t return a factory function', function() {})

	});

	describe('.set()', function() {

	});

	describe('.factory()', function() {

	});

	describe('.locator()', function() {

	});

});