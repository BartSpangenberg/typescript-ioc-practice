import IOC from "./IOC";
import Bar from "./entities/Bar";
import Foo from "./entities/Foo";
import GlobalSettings from "./entities/GlobalSettings";
import { setupIOC } from "./setupIOC";

setupIOC();

/////////////////////////////////////////////////////////////////////////////////////////
console.log("--------------------------------------------------");
console.log("START OF EXTENDED LOCATOR EXAMPLE");

// Resolve instances
const resolvedFooInstance = IOC.get<Foo>("foo");
console.log(resolvedFooInstance.name); // Output: FooInstance

const resolvedBarInstance = IOC.get<Bar>("bar");
console.log(resolvedBarInstance.foo.name); // Output: FooInstance

const singletonFooInstance = IOC.get<Foo>("singletonFoo");
console.log(singletonFooInstance.name); // Output: SingletonFooInstance

const registeredFooInstance = IOC.get<Foo>("registeredFoo");
console.log(registeredFooInstance.name); // Output: RegisteredInstanceFoo

// Check if a type is registered
console.log(IOC.isRegistered("foo")); // Output: true

// Remove singleton
IOC.dispose("singletonFoo"); // Output: Disposing Foo: SingletonFooInstance

// Test if state is preserved in singleton
const globalSettings: GlobalSettings = IOC.get<GlobalSettings>("globalSettings");
globalSettings.increment();
console.log(globalSettings.counter); // Output: 1
globalSettings.increment();
console.log(globalSettings.counter); // Output: 2

const globalSettings2: GlobalSettings = IOC.get<GlobalSettings>("globalSettings");
console.log(globalSettings2.counter); // Output: 2

IOC.dispose("globalSettings");
IOC.registerSingleton<GlobalSettings>("globalSettings", () => new GlobalSettings());
const globalSettings3: GlobalSettings = IOC.get<GlobalSettings>("globalSettings");
console.log(globalSettings3.counter); // Output: 0
