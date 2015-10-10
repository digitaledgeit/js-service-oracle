var path = require('path');
var assert = require('assert');
var locator = require('..');

describe('ServiceOracle', function() {

	describe('.has()', function() {

    it('should return false when there are no services registered', function() {
      var has = locator()
        .has('FooBar')
      ;
      assert(!has);
    });

    it('should return true when there is a service instance registered', function() {
      var has = locator()
        .instance('FooBar', {})
        .has('FooBar')
      ;
      assert(has);
    });

    it('should return true when there is a service factory registered', function() {
      var has = locator()
          .factory('FooBar', function() {return {};})
          .has('FooBar')
        ;
      assert(has);
    });

    it('should return true when there is a service locator registered', function() {
      var has = locator()
        .locator(locator().instance('FooBar', {}))
        .has('FooBar')
      ;
      assert(has);
    });

    it('should return false when there is a service locator registered with no service registered', function() {
      var has = locator()
          .locator(locator())
          .has('FooBar')
        ;
      assert(!has);
    });

	});

	describe('.new()', function() {

    it('should return a *NEW* service instance each time the method is called', function() {
      var services = locator().factory('FooBar', function() {return {};});
      assert.notStrictEqual(services.new('FooBar'), services.new('FooBar'));
    });

    it('should throw an exception when there are no services registered', function() {
      assert.throws(function() {
        locator().new('FooBar');
      });
    });

    it('throw an exception when there are no services registered in a child locator', function() {
      assert.throws(function() {
        locator()
          .locator(locator())
          .new('FooBar')
        ;
      });
    });

    it('should return a service instance when there is a service factory registered', function() {
      var service = locator()
          .factory('FooBar', function() {return {};})
          .new('FooBar')
        ;
      assert(service instanceof Object);
    });

    it('should return a service instance when there is a service factory registered as a pathname', function() {
      var service = locator()
          .factory('FooBar', path.join(__dirname, './fixtures/factory'))
          .new('FooBar')
        ;
      assert(service instanceof Object);
    });

    it('should throw an exception when there is a service factory registered as a pathname and the path does not exist', function() {
      assert.throws(function() {
        locator()
          .factory('FooBar', path.join(__dirname, './fixtures/foobar'))
          .new('FooBar')
        ;
      });
    });

    it('should return a service instance when there is a service factory registered in a child locator', function() {
      var service = locator()
        .locator(locator().factory('FooBar', function() {return {};}))
        .new('FooBar')
      ;
      assert(service instanceof Object);
    });

	});

	describe('.get()', function() {

    it('should throw an exception when there are no services registered', function() {
      assert.throws(function() {
        locator().get('FooBar');
      });
    });

    it('throw an exception when there are no services registered in a child locator', function() {
      assert.throws(function() {
        locator()
          .locator(locator())
          .get('FooBar')
        ;
      });
    });

    it('should return a service instance when there is a service factory registered', function() {
      var service = locator()
          .factory('FooBar', function() {return {};})
          .get('FooBar')
        ;
      assert(service instanceof Object);
    });

    it('should return a service instance when there is a service factory registered as a pathname', function() {
      var service = locator()
          .factory('FooBar', path.join(__dirname, './fixtures/factory'))
          .get('FooBar')
        ;
      assert(service instanceof Object);
    });

    it('should throw an exception when there is a service factory registered as a pathname and the path does not exist', function() {
      assert.throws(function() {
        locator()
          .factory('FooBar', path.join(__dirname, './fixtures/foobar'))
          .get('FooBar')
        ;
      });
    });

    it('should return a service instance when there is a service factory registered in a child locator', function() {
      var service = locator()
          .locator(locator().factory('FooBar', function() {return {};}))
          .get('FooBar')
        ;
      assert(service instanceof Object);
    });

    it('should return the same service instance each time the method is called', function() {
      var services = locator().factory('FooBar', function() {return {};});
      assert.strictEqual(services.get('FooBar'), services.get('FooBar'));
    });

	});

	describe('.instance()', function() {

    it('should throw an exception when a service with the same name is already registered', function() {
      assert.throws(function() {
        locator()
          .instance('FooBar')
          .instance('FooBar')
        ;
      });
    });

	});

	describe('.factory()', function() {

    it('should throw an exception when a service with the same name is already registered', function() {
      assert.throws(function() {
        locator()
          .instance('FooBar')
          .factory('FooBar')
        ;
      });
    });

	});

	describe('.locator()', function() {

    it('shouldn\'t add the same locator twice', function() {
      var child = locator();
      locator()
        .locator(child)
        .locator(child)
      ;
      //TODO: how to assert?
    });

	});

});