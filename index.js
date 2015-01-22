
/**
 * A service locator
 * @constructor
 */
function ServiceLocator() {
	this._services  = [];
	this._factories = [];
}

ServiceLocator.prototype = {

	/**
	 * Check whether a service exists in the service locator
	 * @param   {string}                            name       The service name
	 * @returns {boolean}
	 */
	has: function(name) {

		//check for an existing instance of the service
		if (Object.keys(this._services).indexOf(name) !== -1) {
			return true;
		}

		//check for a factory to create a new instance of the service
		if (Object.keys(this._factories).indexOf(name) !== -1) {
			return true;
		}

		return false;
	},

	/**
	 * Retrieve a service from the service locator
	 * @param   {string}                            name       The service name
	 * @returns {*}
	 */
	get: function(name) {

		//check for an existing instance of the service
		if (Object.keys(this._services).indexOf(name) !== -1) {
			return this._services[name];
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
			return this._services[name] = factory(this);
		}

		throw new Error('Cannot locate a service named "'+name+'".');
	},

	/**
	 * Store a service in the service locator
	 * @param   {string}                            name       The service name
	 * @param   {*}                                 service    The service instance
	 * @returns {ServiceLocator}
	 */
	set: function(name, service) {

		//check the service doesn't already exist
		if (this.has(name)) {
			throw new Error('Cannot overwrite an existing service.')
		}

		//store the service
		this._services[name] = service;

		return this;
	},

	/**
	 * Store a factory in the service locator
	 * @param   {string}                            name       The service name
	 * @param   {string|function(ServiceLocator):*} factory    The service instance
	 * @returns {ServiceLocator}
	 */
	factory: function(name, factory) {

		//check the service doesn't already exist
		if (this.has(name)) {
			throw new Error('Cannot overwrite an existing service.')
		}

		//store the factory
		this._factories[name] = factory;

		return this;
	}

};

module.exports = ServiceLocator;