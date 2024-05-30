interface IDisposable {
  dispose(): void;
}

class ExtendedLocator {
  private factories: Map<string, () => any>;
  private singletons: Map<string, any>;
  private instances: Map<string, any>;

  constructor() {
    this.factories = new Map();
    this.singletons = new Map();
    this.instances = new Map();
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

  // Register an already created instance
  registerInstance<T>(key: string, instance: T): void {
    this.instances.set(key, instance);
  }

  // Resolve an instance using the registered factory, singleton, or instance
  resolve<T>(key: string): T {
    if (this.singletons.has(key)) {
      return this.singletons.get(key);
    }
    if (this.instances.has(key)) {
      return this.instances.get(key);
    }
    const factory = this.factories.get(key);
    if (!factory) {
      throw new Error(`No factory registered for key: ${key}`);
    }
    return factory();
  }

  // Remove a singleton from memory and call its dispose method if available
  removeSingleton(key: string): void {
    this.release(key);
  }

  // General release method to handle disposal of any registered instance
  release(key: string): void {
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
      throw new Error(`No instance or singleton registered for key: ${key}`);
    }
  }

  // Inject dependencies into an existing object
  buildUp<T>(instance: T): T {
    // Logic to inject dependencies into the existing instance
    // This is a simplified example; actual implementation might vary
    // based on your dependency injection requirements
    return instance;
  }

  // Check if a type is registered with the container
  isRegistered(key: string): boolean {
    return this.factories.has(key) || this.singletons.has(key) || this.instances.has(key);
  }
}

export default ExtendedLocator;
