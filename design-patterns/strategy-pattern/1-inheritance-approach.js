class Duck {
  quack() {
    console.log("QUACK!");
  }
}

class WingFlyerDuck extends Duck {
  fly() {
    console.log("Flap! Flap! Flap!");
  }
}

class JetFlyerDuck extends Duck {
  fly() {
    console.log("FFFWOOOOOSH!");
  }
}

class CityDuck extends WingFlyerDuck {
  display() {
    console.log("I'm a city duck");
    this.quack();
    this.fly();
  }
}

class WildDuck extends WingFlyerDuck {
  display() {
    console.log("I'm a wild duck");
    this.quack();
    this.fly();
  }
}

class MountainDuck extends JetFlyerDuck {
  display() {
    console.log("I'm a mountain duck");
    this.quack();
    this.fly();
  }
}

class LakeDuck extends JetFlyerDuck {
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
