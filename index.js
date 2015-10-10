
/**
 * A service locator
 * @constructor
 * @returns {ServiceOracle}
 */
function ServiceOracle() {

  //create a new instance when the constructor is called as a normal method
	if (!(this instanceof ServiceOracle)) {
		return new ServiceOracle();
	}

  /**
   * The service instances
   * @private
   * @type {Object}
   */
	this._instances = {};

  /**
   * The service factories
   * @private
   * @type {Object}
   */
	this._factories = {};

  /**
   * The service locators
   * @private
   * @type {Object}
   */
  this._locators  = [];

}

ServiceOracle.prototype = {

	/**
	 * Check whether a service can be retrieved from the service locator
	 * @param   {string}                            name       The service name
	 * @returns {boolean}
	 */
	has: function(name) {

		//check for an existing instance of the service
		if (Object.keys(this._instances).indexOf(name) !== -1) {
			return true;
		}

		//check for a factory to create a new instance of the service
		if (Object.keys(this._factories).indexOf(name) !== -1) {
			return true;
		}

    //check for a locator with an instance of the service
    for (var i=0; i<this._locators.length; ++i) {
      if (this._locators[i].has(name)) {
        return true;
      }
    }

		return false;
	},

	/**
	 * Retrieve a *NEW* instance of a service from the service locator - only works for services created via a factory
	 * @param   {string}                            name       The service name
	 * @returns {*}
	 */
	new: function(name) {

		//check for a factory to create a new instance of the service
		if (Object.keys(this._factories).indexOf(name) !== -1) {

			var
				service,
				factory = this._factories[name]
			;

			//if the factory is a path to a module/file then try and load it
			if (typeof(factory) === 'string') {

				try {
					factory = require(factory);
				} catch (err) {
					var error = new Error('Cannot locate the factory for a service named "'+name+'" at "'+factory+'".');
					error.previous = err;
					throw error;
				}

			}

			//run the factory, create an instance of the service and store it for next time
			return factory(this);
		}

    //check for a locator to create a new instance of the service
    for (var i=0; i<this._locators.length; ++i) {
      if (this._locators[i].has(name)) {
        return this._locators[i].new(name);
      }
    }

		throw new Error('Cannot locate a factory to create a new service named "'+name+'".');
	},

	/**
	 * Retrieve a service from the service locator
	 * @param   {string}                            name       The service name
	 * @returns {*}
	 */
	get: function(name) {

		//check for an existing instance of the service
		if (Object.keys(this._instances).indexOf(name) !== -1) {
			return this._instances[name];
		}

		//check for a factory to create a new instance of the service
		if (Object.keys(this._factories).indexOf(name) !== -1) {

			var
				service,
				factory = this._factories[name]
			;

			//if the factory is a path to a module/file then try and load it
			if (typeof(factory) === 'string') {

				try {
					factory = require(factory);
				} catch (err) {
					var error = new Error('Cannot locate the factory for a service named "'+name+'" at "'+factory+'".');
					error.previous = err;
					throw error;
				}

			}

			//run the factory, create an instance of the service and store it for next time
			return this._instances[name] = factory(this);
		}

    //check for a locator to get a shared instance of the service
    for (var i=0; i<this._locators.length; ++i) {
      if (this._locators[i].has(name)) {
        return this._locators[i].get(name);
      }
    }

		throw new Error('Cannot locate a service named "'+name+'".');
	},

	/**
	 * Store a service in the service locator
	 * @param   {string}                            name       The service name
	 * @param   {*}                                 service    The service instance
	 * @returns {ServiceOracle}
	 */
	instance: function(name, service) {

		//check the service doesn't already exist
		if (this.has(name)) {
			throw new Error('Cannot overwrite an existing service.')
		}

		//store the service
		this._instances[name] = service;

		return this;
	},

	/**
	 * Store a factory in the service locator
	 * @param   {string}                            name       The service name
	 * @param   {string|function(ServiceOracle):*} factory    The service instance
	 * @returns {ServiceOracle}
	 */
	factory: function(name, factory) {

		//check the service doesn't already exist
		if (this.has(name)) {
			throw new Error('Cannot overwrite an existing service.')
		}

		//store the factory
		this._factories[name] = factory;

		return this;
	},

  /**
   * Store a locator in the service locator
   * @param   {ServiceOracle} locator    The locator
   * @returns {ServiceOracle}
   */
  locator: function(locator) {

    //check the service doesn't already exist
    if (this._locators.indexOf(locator) === -1) {
      this._locators.push(locator);
    }

    return this;
  }

};

module.exports = ServiceOracle;