# Strategy Pattern

A design pattern that allows us to reuse code through composition instead of inheritance.

It consists of encapsulating diffrent algorithms to do the same thing and making them interchangeable.

Let's say we have a `Duck` class with `quack()` and `fly()` methods. All ducks can quack and fly, so it makes sense. Let's say that we need two different kinds of Duck, they are different because they have their own `display()` method.

```js
class Duck {
  quack() {}
  fly() {}
}

class CityDuck extends Duck {
  display()
}

class WildDuck extends Duck {
  display()
}
```

The `quack()` and `fly()` methods are inherited from the `Duck` class and the individual `display()` methods are defined on each sub-class. Everything looks great!

What happens now if we need 2 more types of ducks. These ducks can quack like the others, but they have a different way of flying. Even though they have a different approach to flying, they are still flying, so we should maintain the `fly()` method interface of these new sub-classes.

```js
class Duck {
  quack() {}
  fly() {} // wing fly
}

class CityDuck extends Duck {
  display()
}

class WildDuck extends Duck {
  display()
}

class MountainDuck extends Duck {
  display()
  fly() // jet fly
}

class LakeDuck extends Duck {
  display()
  fly() // jet fly
}
```

We can override the fly method on each sub-class, but we find ourselves repeating the code for the jet fly approach to the `fly()` method.

We can try to solve this by adding an intermediate class that sits between `Duck` and all the other sub-classes. Let's call them `WingFlyer` and `JetFlyer`:

```js
class Duck {
  quack() {}
}

class WingFlyerDuck extends Duck {
  fly() // wing fly
}

class JetFlyerDuck extends Duck {
  fly() // jet fly
}

class CityDuck extends WingFlyerDuck {
  display()
}

class WildDuck extends WingFlyerDuck {
  display()
}

class MountainDuck extends JetFlyerDuck {
  display()
  fly() // jet fly
}

class LakeDuck extends JetFlyerDuck {
  display()
  fly() // jet fly
}
```

This approach works just fine, but we can start to feel a little bit unconfortable with this approach. We are trying to solve a problem caused by inheritance by doing more inheritance! And what happens if we want the `CityDuck` and the `LakeDuck` to quack one way and the `WildDuck` and the `MountainDuck` to quack a different way? Where do those sub-classes go in our hierarchy?

This is the kind of problem the Strategy Pattern helps us solve. The Strategy Pattern helps us define our objects by what they can do instead of by what they are, i.e., change our IS-A relationships into HAS-A relationships. Instead of having sub-classes of ducks for each combination of methods, we can have different strategies for each method and mix-and-match them at the `Duck` class level:

```js
class Duck {
  has a FlyStrategy
  has a QuackStrategy
}

class FlyStrategy {
  // abstract class, can't fly, it just defines the interface
  fly()
}

class WingFlyStrategy extends FlyStrategy {
  // concrete class, actually implements the logic for flying
  fly()   // wing fly
}

class JetFlyStrategy extends FlyStrategy {
  // concrete class, actually implements the logic for flying
  fly()   // jet fly
}

class QuackStrategy {
  // abstract class, can't quack, it just defines the interface
  quack()
}

class QuietQuackStrategy extends QuackStrategy {
  // concrete class, actually implements the logic for quacking
  quack()   // quiet quack
}

class LoudQuackStrategy extends QuackStrategy {
  // concrete class, actually implements the logic for quacking
  quack()   // loud quack
}
```

Now that we have strategies for all the different approaches to flying and quacking, we can combine them to create any kind of duck without having a complex hierarchy of classes.

If we refactored the display method to a Strategy based approach, we wouldn't even need the bottom level sub-classes, since all they do is define which methods a specific class of duck has. We can now do completely at the `Duck` class level. A `CityDuck` would now be a `Duck` that wing-flies, loud-quacks and pixel-displays itself. A `LakeDuck` would now be a `Duck` that jet-flies, quiet-quacks and vector-displays itself.

The great benefit of this approach is that we can add as many strategies as we want without having to change the structure of our code.

As we saw at the beginning, the inheritance approach forced us to make some decisions very early on in our project. Those decisions made sense at the time but added painful complexity as our project grew. With the Strategy pattern we favour composition over inheritance. We compose our classes out of different strategies for each method. This approach gives us much more flexibility and doesn't add complexity as our project grows.
