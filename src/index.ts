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
const resolvedFooInstance = IOC.get(Foo);
console.log(resolvedFooInstance.name); // Output: FooInstance

const resolvedBarInstance = IOC.get(Bar);
console.log(resolvedBarInstance.foo.name); // Output: FooInstance

const singletonFooInstance = IOC.get(Foo);
console.log(singletonFooInstance.name); // Output: SingletonFooInstance

const registeredFooInstance = IOC.get(Foo);
console.log(registeredFooInstance.name); // Output: RegisteredInstanceFoo

// Check if a type is registered
console.log(IOC.isRegistered(Foo)); // Output: true

// Remove singleton
IOC.disposeSingleton(Foo); // Output: Disposing Foo: SingletonFooInstance

// Test if state is preserved in singleton
const globalSettings: GlobalSettings = IOC.get(GlobalSettings);
globalSettings.increment();
console.log(globalSettings.counter); // Output: 1
globalSettings.increment();
console.log(globalSettings.counter); // Output: 2

const globalSettings2: GlobalSettings = IOC.get(GlobalSettings);
console.log(globalSettings2.counter); // Output: 2

IOC.dispose(GlobalSettings);
IOC.registerSingleton<GlobalSettings>(GlobalSettings, () => new GlobalSettings());
const globalSettings3: GlobalSettings = IOC.get(GlobalSettings);
console.log(globalSettings3.counter); // Output: 0
