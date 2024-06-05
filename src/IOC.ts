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
    registerSingleton: Registers a type as a Singleton, ensuring only one instance is created.
    registerFactory: Registers a factory method for creating instances of a type.
    get: Retrieves an instance of a registered type, injecting dependencies as needed.
    dispose / removeSingleton: Manages the disposal and cleanup of resolved instances.
    registerInstance: Registers an already created instance with the container.
*/

interface IDisposable {
  dispose(): void;
}

class IOC {
  private static factories: Map<symbol, () => any> = new Map();
  private static singletons: Map<symbol, any> = new Map();
  private static instances: Map<symbol, any> = new Map();

  // Register a factory for a specific type
  static registerFactory<T>(type: new (...args: any[]) => T, factory: () => T): void {
    const key = Symbol.for(type.name);
    this.factories.set(key, factory);
  }

  // Register a singleton for a specific type
  static registerSingleton<T>(type: new (...args: any[]) => T, factory: () => T): void {
    const key = Symbol.for(type.name);
    const singleton = factory();
    this.singletons.set(key, singleton);
  }

  // Register an already created instance
  static registerInstance<T>(type: new (...args: any[]) => T, instance: T): void {
    const key = Symbol.for(type.name);
    this.instances.set(key, instance);
  }

  // Get an instance using the registered factory, singleton, or instance
  static get<T>(type: new (...args: any[]) => T): T {
    const key = Symbol.for(type.name);
    if (this.singletons.has(key)) {
      return this.singletons.get(key);
    }
    if (this.instances.has(key)) {
      return this.instances.get(key);
    }
    const factory = this.factories.get(key);
    if (!factory) {
      throw new Error(`No factory registered for type: ${type.name}`);
    }
    return factory();
  }

  // Remove a singleton from memory and call its dispose method if available
  static disposeSingleton(type: new (...args: any[]) => any): void {
    this.dispose(type);
  }

  // General release method to handle disposal of any registered instance
  static dispose(type: new (...args: any[]) => any): void {
    const key = Symbol.for(type.name);
    if (this.singletons.has(key)) {
      const singleton = this.singletons.get(key);
      if (singleton && typeof (singleton as IDisposable).dispose === "function") {
        (singleton as IDisposable).dispose();
      }
      this.singletons.delete(key);
    } else if (this.instances.has(key)) {
      const instance = this.instances.get(key);
      if (instance && typeof (instance as IDisposable).dispose === "function") {
        (instance as IDisposable).dispose();
      }
      this.instances.delete(key);
    } else {
      throw new Error(`No instance or singleton registered for type: ${type.name}`);
    }
  }

  // Check if a type is registered with the container
  static isRegistered(type: new (...args: any[]) => any): boolean {
    const key = Symbol.for(type.name);
    return this.factories.has(key) || this.singletons.has(key) || this.instances.has(key);
  }
}

export default IOC;

/*
  Advanced typescript explenation

  * Map vs object
  Both are key value pair type data structures. 
  Map: Advanced version of an object. For example the "has" method is not available in object.
  This method allows you to check if a key exists in the map.

  * Symbol vs String
  Both are used as property keys in JavaScript.
  Symbol: A unique and immutable primitive value.
  This makes them useful for defining unique property keys, especially for internal or private properties in objects.

  * Generic types
  static registerFactory<T>(type: new (...args: any[]) => T, factory: () => T): void
  <T>: Declares a generic type parameter T.
  Generic types allow classes, interfaces, and functions to be flexible and reusable with different types without sacrificing type safety.
*/
