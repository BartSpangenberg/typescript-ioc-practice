import IOC from "./IOC";
import Bar from "./entities/Bar";
import Foo from "./entities/Foo";
import GlobalSettings from "./entities/GlobalSettings";

export const setupIOC = () => {
  // Register factories
  IOC.registerFactory<Foo>("foo", () => new Foo("FooInstance"));
  IOC.registerFactory<Bar>("bar", () => new Bar(IOC.get<Foo>("foo")));

  // Register singleton
  IOC.registerSingleton<Foo>("singletonFoo", () => new Foo("SingletonFooInstance"));

  // Register instance
  const fooInstance2 = new Foo("RegisteredInstanceFoo");
  IOC.registerInstance<Foo>("registeredFoo", fooInstance2);

  // Register global settings
  IOC.registerSingleton<GlobalSettings>("globalSettings", () => new GlobalSettings());
};
