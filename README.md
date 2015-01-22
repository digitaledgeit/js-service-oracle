# servicelocator

A service locator.

### This project is a Work In Progress. Here be dragons!

## API

### Methods

#### new ServiceLocator()

Create a new service locator.

#### .has(name : string) : boolean

Check whether a service exists.

#### .get(name : string) : *

Get a shared instance of a service.

#### .set(name : string, value : *) : ServiceLocator

Set a shared instance of a service.

#### .setFactory(name : string, value : string|function(ServiceLocator) : ServiceLocator

Set a function or module path as a service factory.
 


What should I store in the locator.
What kind of services should I use it.
What about dependency injection?

TODO:
    - how to handle async stuff?