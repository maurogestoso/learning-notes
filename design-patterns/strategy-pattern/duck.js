class Duck {
  constructor(name, config = {}) {
    this.name = name;
    this.__config = config;
  }
  fly(...args) {
    const strategy = this.__config.fly || "can";
    const flyFunction = flyStrategies[strategy];

    return flyFunction.apply(this, args);
  }
  quack() {
    console.log(`${this.name} says quack!`);
  }
}

const flyStrategies = {
  can: function() {
    console.log(`${this.name} can fly`);
  },
  cannot: function() {
    console.log(`${this.name} cannot fly`);
  }
};

export default Duck;
