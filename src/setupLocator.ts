import Locator from "./Locator";
import Bar from "./entities/Bar";
import Foo from "./entities/Foo";
import GlobalSettings from "./entities/GlobalSettings";

// Create the IoC container instance
export const container = new Locator();

// Register factories
container.registerFactory<Foo>("foo", () => new Foo("FooInstance"));
container.registerFactory<Bar>("bar", () => new Bar(container.resolve<Foo>("foo")));

// Register singletons
container.registerSingleton<GlobalSettings>("global-settings", () => new GlobalSettings());
