import Foo from "../../../entities/Foo";
import { container } from "../../../setupLocator";

export default class HabitController {
  initialize() {}

  addHabit() {
    const foo: Foo = container.resolve("foo");
    console.log(foo.name);
  }
}
