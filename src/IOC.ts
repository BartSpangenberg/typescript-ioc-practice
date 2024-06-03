interface IDisposable {
  dispose(): void;
}

// TODO: Change keys to types

class IOC {
  private static factories: Map<string, () => any> = new Map();
  private static singletons: Map<string, any> = new Map();
  private static instances: Map<string, any> = new Map();

  // Register a factory for a specific type
  static registerFactory<T>(key: string, factory: () => T): void {
    this.factories.set(key, factory);
  }

  // Register a singleton for a specific type
  static registerSingleton<T>(key: string, factory: () => T): void {
    const singleton = factory();
    this.singletons.set(key, singleton);
  }

  // Register an already created instance
  static registerInstance<T>(key: string, instance: T): void {
    this.instances.set(key, instance);
  }

  // Get an instance using the registered factory, singleton, or instance
  static get<T>(key: string): T {
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
  static disposeSingleton(key: string): void {
    this.dispose(key);
  }

  // General release method to handle disposal of any registered instance
  static dispose(key: string): void {
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

  // Check if a type is registered with the container
  static isRegistered(key: string): boolean {
    return this.factories.has(key) || this.singletons.has(key) || this.instances.has(key);
  }
}

export default IOC;
