import Bar from "./entities/Bar";
import Foo from "./entities/Foo";
import GlobalSettings from "./entities/GlobalSettings";
import { extendedContainer } from "./setupExtendedLocator";
import { container } from "./setupLocator";

/////////////////////////////////////////////////////////////////////////////////////////
console.log("--------------------------------------------------");
console.log("START OF LOCATOR EXAMPLE");

// Resolve instances
const fooInstance: Foo = container.resolve<Foo>("foo");
console.log(fooInstance.name); // Output: FooInstance

const barInstance: Bar = container.resolve<Bar>("bar");
console.log(barInstance.foo.name); // Output: FooInstance

const globalSettings: GlobalSettings = container.resolve<GlobalSettings>("global-settings");
globalSettings.increment();
globalSettings.increment();
console.log(`Global settings counter 1: ${globalSettings.counter}`); // Output: 2

const globalSettings2: GlobalSettings = container.resolve<GlobalSettings>("global-settings");
globalSettings2.increment();
console.log(`Global settings counter 2: ${globalSettings.counter}`); // Output: 3

// Remove a singleton
container.removeSingleton("global-settings");

// Resolve a new instance of the singleton
container.registerSingleton<GlobalSettings>("global-settings", () => new GlobalSettings());
const globalSettings3: GlobalSettings = container.resolve<GlobalSettings>("global-settings");
console.log(`Global settings counter 3: ${globalSettings3.counter}`); // Output: 0

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
console.log("--------------------------------------------------");
console.log("START OF EXTENDED LOCATOR EXAMPLE");

// Resolve instances
const resolvedFooInstance = extendedContainer.resolve<Foo>("foo");
console.log(resolvedFooInstance.name); // Output: FooInstance

const resolvedBarInstance = extendedContainer.resolve<Bar>("bar");
console.log(resolvedBarInstance.foo.name); // Output: FooInstance

const singletonFooInstance = extendedContainer.resolve<Foo>("singletonFoo");
console.log(singletonFooInstance.name); // Output: SingletonFooInstance

const registeredFooInstance = extendedContainer.resolve<Foo>("registeredFoo");
console.log(registeredFooInstance.name); // Output: RegisteredInstanceFoo

// Check if a type is registered
console.log(extendedContainer.isRegistered("foo")); // Output: true

// Remove singleton
extendedContainer.release("singletonFoo"); // Output: Disposing Foo: SingletonFooInstance
