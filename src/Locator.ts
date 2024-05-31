/*
    * IoC Container - (Inversion of Control Container)
    An IoC (Inversion of Control) container is a framework for managing dependencies and the lifecycle of objects in a software application. 
    It automatically injects dependencies into objects, promoting loose coupling and easier testing. Examples include Spring in Java and Unity in C#.
*/

/*
    * Factory
    In programming, a factory is a design pattern that provides a way to create objects without specifying the exact class of object that will be created. 
    It encapsulates the instantiation logic, allowing for more flexible and scalable code. The pattern includes methods like Factory Method and Abstract Factory

    * Factory in IoC Container
    In an IoC container, a factory is used to create instances of objects and manage their dependencies. 
    It allows the IoC container to abstract and encapsulate the instantiation logic, enabling dynamic object creation, 
    dependency injection, and ensuring that objects are configured and initialized properly.
*/

/*
    * Singleton
    A Singleton is a design pattern that ensures a class has only one instance and provides a global point of access to that instance. 
    It is commonly used to manage shared resources or configuration settings, ensuring that only one instance of the class is created and used throughout the application.

    * Singleton in IoC Container
    In an IoC (Inversion of Control) container, the Singleton pattern plays a crucial role in managing the lifecycle of objects 
    to ensure that only one instance of a particular class is created and used throughout the application.
*/

/*
    * Methods on an IoC Container

    Must methods
    registerSingleton: Registers a type as a Singleton, ensuring only one instance is created.
    registerFactory: Registers a factory method for creating instances of a type.
    resolve: Retrieves an instance of a registered type, injecting dependencies as needed.
    dispose / release / removeSingleton: Manages the disposal and cleanup of resolved instances.

    Nice to have methods
    registerInstance: Registers an already created instance with the container.
    buildUp: Injects dependencies into an existing object instance.
    isRegistered: Checks if a type is registered with the container.
*/

class Locator {
  private factories: Map<string, () => any>;
  private singletons: Map<string, any>;

  constructor() {
    this.factories = new Map();
    this.singletons = new Map();
  }

  // Register a factory for a specific type
  registerFactory<T>(key: string, factory: () => T): void {
    this.factories.set(key, factory);
  }

  // Register a singleton for a specific type
  registerSingleton<T>(key: string, factory: () => T): void {
    const singleton = factory();
    this.singletons.set(key, singleton);
  }

  // Resolve an instance using the registered factory or singleton
  resolve<T>(key: string): T {
    if (this.singletons.has(key)) {
      return this.singletons.get(key);
    }

    const factory = this.factories.get(key);
    if (!factory) {
      throw new Error(`No factory registered for key: ${key}`);
    }
    return factory();
  }

  // Remove a singleton from memory
  removeSingleton(key: string): void {
    if (this.singletons.has(key)) {
      this.singletons.delete(key);
    } else {
      throw new Error(`No singleton registered for key: ${key}`);
    }
  }
}

export default Locator;
