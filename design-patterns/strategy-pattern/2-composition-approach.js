class Duck {
  constructor(flyStrategy, quackStrategy) {
    this.fly = FlyStrategies[flyStrategy];
    this.quack = QuackStrategies[quackStrategy];
  }
}

const FlyStrategies = {
  wing: function() {
    console.log("FLAP! FLAP! FLAP!");
  },
  jet: function() {
    console.log("FFFWOOOOOSH!");
  }
};

const QuackStrategies = {
  quiet: function() {
    console.log("quack");
  },
  loud: function() {
    console.log("QUACK!");
  }
};

class CityDuck extends Duck {
  constructor() {
    super("wing", "loud");
  }
  display() {
    console.log("I'm a city duck");
    this.quack();
    this.fly();
  }
}

class WildDuck extends Duck {
  constructor() {
    super("wing", "quiet");
  }
  display() {
    console.log("I'm a wild duck");
    this.quack();
    this.fly();
  }
}

class MountainDuck extends Duck {
  constructor() {
    super("jet", "loud");
  }
  display() {
    console.log("I'm a mountain duck");
    this.quack();
    this.fly();
  }
}

class LakeDuck extends Duck {
  constructor() {
    super("jet", "quiet");
  }
  display() {
    console.log("I'm a lake duck");
    this.quack();
    this.fly();
  }
}

const cd = new CityDuck();
cd.display();

const wd = new WildDuck();
wd.display();

const md = new MountainDuck();
md.display();

const ld = new LakeDuck();
ld.display();
