import Locator from "./Locator";
import Bar from "./entities/Bar";
import Foo from "./entities/Foo";
import GlobalSettings from "./entities/GlobalSettings";

// Create the IoC container instance
export const container = new Locator();

// Register factories
// TODO: Make it type based instead of keys
container.registerFactory<Bar>("bar", () => new Bar(container.resolve<Foo>("foo")));
container.registerFactory<Foo>("foo", () => new Foo("FooInstance"));

// Register singletons
container.registerSingleton<GlobalSettings>("global-settings", () => new GlobalSettings());
