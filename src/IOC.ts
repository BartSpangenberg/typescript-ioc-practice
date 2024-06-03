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
