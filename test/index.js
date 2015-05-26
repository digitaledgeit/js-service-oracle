var assert = require('assert');
var locator = require('..');

describe('ServiceLocator', function() {

	describe('.has()', function() {

	});

	describe('.new()', function() {

		it('should return a new instance each time', function() {

			var sm = locator().factory('rand', function() {
				return new Number(Math.random()*100);
			});

			assert.notEqual(sm.new('rand'), sm.new('rand'));

		});

    // === upstream locator ===

    it('should return a service from the upstream service locator when it exists in the upstream locator but not in the downstream locator', function() {
      var downstream = locator()
        .locator(locator().factory('MyService', function() {
          return 'FromUpstream';
        }))
      ;
      assert.equal(downstream.new('MyService'), 'FromUpstream');
    });

    it('should return a service from the downstream service locator when it exists in the downstream locator', function() {
      var downstream = locator()
        .factory('MyService', function() {
          return 'FromDownstream';
        })
        .locator(locator().factory('MyService', function() {
          return 'FromUpstream';
        }))
      ;
      assert.equal(downstream.new('MyService'), 'FromDownstream');
    });

    it('should throw an error when it does not exist in the upstream or downstream locator', function() {
      assert.throws(function(err) {
        var downstream = locator().locator(locator());
        downstream.get('MyService'), 'FromDownstream';
      });
    });

	});

	describe('.get()', function() {

		it('should return the same instance each time', function() {

			var sm = locator().factory('rand', function() {
				return new Number(Math.random()*100);
			});

			assert.equal(sm.get('rand'), sm.get('rand'));

		});

		it('should throw an error if I a factory module doesn\'t return a factory function', function() {})


    // === upstream locator ===

    it('should return a service from the upstream service locator when it exists in the upstream locator but not in the downstream locator', function() {
      var downstream = locator().locator(locator().set('MyService', 'FromUpstream'));
      assert.equal(downstream.get('MyService'), 'FromUpstream');
    });

    it('should return a service from the downstream service locator when it exists in the downstream locator', function() {
      var downstream = locator().set('MyService', 'FromDownstream').locator(locator().set('MyService', 'FromUpstream'));
      assert.equal(downstream.get('MyService'), 'FromDownstream');
    });

    it('should throw an error when it does not exist in the upstream or downstream locator', function() {
      assert.throws(function(err) {
        var downstream = locator().locator(locator());
        downstream.get('MyService'), 'FromDownstream';
      });
    });

	});

	describe('.set()', function() {

	});

	describe('.factory()', function() {

	});

	describe('.locator()', function() {

	});

});