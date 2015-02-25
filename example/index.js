var locator = require('..');

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
		var users     = locator.get('Config');
		var posts     = locator.get('Config');
		var service   = new BlogService(users, posts);
		return service;
	})
;

//somewhere else e.g. in your express routes
var service = services.get('BlogService');

