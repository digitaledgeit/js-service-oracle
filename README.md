# locator

A service locator.

## Installation

    npm install --save @iso/locator
    
## Usage
    
    var locator = require('@iso/locator');
    
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

#### .locator(locator : ServiceLocator) : ServiceLocator

Look for services in another locator too.
 
## TODO:
- async factories?
- documentation:
    - What should I store in the locator?
    - What kind of services should I use it?
    - What about dependency injection?

## License

The MIT License (MIT)

Copyright (c) 2015 James Newell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.