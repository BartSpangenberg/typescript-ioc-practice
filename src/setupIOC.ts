import IOC from "./IOC";
import Bar from "./entities/Bar";
import Foo from "./entities/Foo";
import GlobalSettings from "./entities/GlobalSettings";

export const setupIOC = () => {
  // Register factories
  IOC.registerFactory<Foo>(Foo, () => new Foo("FooInstance"));
  IOC.registerFactory<Bar>(Bar, () => new Bar(IOC.get<Foo>(Foo)));

  // Register singleton
  IOC.registerSingleton<Foo>(Foo, () => new Foo("SingletonFooInstance"));

  // Register instance
  const fooInstance2 = new Foo("RegisteredInstanceFoo");
  IOC.registerInstance<Foo>(Foo, fooInstance2);

  // Register global settings
  IOC.registerSingleton<GlobalSettings>(GlobalSettings, () => new GlobalSettings());
};
