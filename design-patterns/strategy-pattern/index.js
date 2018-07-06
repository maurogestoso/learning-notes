import Duck from "./duck";

class CityDuck extends Duck {}
class WildDuck extends Duck {}
class RubberDuck extends Duck {}

const donald = new CityDuck("Donald");
donald.quack();
donald.fly();

const tom = new WildDuck("Tom");
tom.quack();
tom.fly();

const tim = new RubberDuck("Tim", { fly: "cannot" });
tim.fly();
tim.quack();
