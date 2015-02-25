# service-oracle

A service locator. 

The all-knowing Oracle knows *all* about your services!

### This project is a Work In Progress. Here be dragons!

<small>Crap name I know, `service-locator` was taken but you can suggest something better.</small>


## Installation

    npm install --save service-oracle
    
## Usage
    
    var locator = require('service-oracle');
    
    //setup your services
    var services = locator()
    	.set('Config', require('./config.json'))
    	.factory('Database', function(locator) {
    		var config    = locator.get('Config');
    		var database  = new Database(config.db);
    		return database;
    	})
    	.factory('Users', function(locator) {
    		var database  = locator.get('Database');
    		var users     = new Users(database);
    		return users;
    	})
    	.factory('Posts', function(locator) {
    		var database  = locator.get('Database');
    		var posts     = new Posts(database);
    		return posts;
    	})
    	.factory('BlogService', function(locator) {
    		var users     = locator.get('Users');
    		var posts     = locator.get('Posts');
    		var service   = new BlogService(users, posts);
    		return service;
    	})
    ;
    
    //somewhere else e.g. in your express routes
    var service = services.get('BlogService');
    


## API

### Methods

#### new ServiceLocator()

Create a new service locator.

#### .has(name : string) : boolean

Check whether a service exists.

#### .new(name : string) : *

Create a new instance of a service.

**Note**: Cannot be a service set with `.set()`

#### .get(name : string) : *

Get a shared instance of a service.

#### .set(name : string, value : *) : ServiceLocator

Set a shared instance of a service.

#### .factory(name : string, value : string|function(ServiceLocator) : ServiceLocator

Set a function or module path as a service factory.
 
## TODO:
- async factories?
- documentation:
    - What should I store in the locator?
    - What kind of services should I use it?
    - What about dependency injection?
