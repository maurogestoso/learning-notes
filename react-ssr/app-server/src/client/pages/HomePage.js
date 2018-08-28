import React from "react";

const HomePage = () => (
  <div>
    <div>I'm the BEST Home component</div>
    <button onClick={() => console.log("Hello")}>Click me!</button>
  </div>
);

export default { component: HomePage };
