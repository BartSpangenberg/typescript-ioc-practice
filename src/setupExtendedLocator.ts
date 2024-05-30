import ExtendedLocator from "./ExtendedLocator";
import Bar from "./entities/Bar";
import Foo from "./entities/Foo";

// Create the IoC container instance
export const extendedContainer = new ExtendedLocator();

// Register factories
extendedContainer.registerFactory<Foo>("foo", () => new Foo("FooInstance"));
extendedContainer.registerFactory<Bar>("bar", () => new Bar(extendedContainer.resolve<Foo>("foo")));

// Register singleton
extendedContainer.registerSingleton<Foo>("singletonFoo", () => new Foo("SingletonFooInstance"));

// Register instance
const fooInstance2 = new Foo("RegisteredInstanceFoo");
extendedContainer.registerInstance<Foo>("registeredFoo", fooInstance2);
