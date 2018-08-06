# Section 1 - Introduction

## Why Server Side Rendering?

"React application" means a traditional React single page app, rendered on the client.

Start a new CRA app and request the root. On the network tab you can see the requests being made.

First you'll see `localhost` which is the request to get the index HTML file. This file has no content, but it has a `script` tag for `bundle.js`, which contains our React app.

This means that until both requests are completed, we won't see anything on the screen.

```
Browser requests page
        V
Browser requests JS file
        V
Content visible
--->  --->
                    (pause)                        (pause)
```

On top of that, if our React app needs to fetch some data or assets, we would have a flow like:

```
time
--->
Browser requests page ---> Browser requests JS file --->
                    (pause)                         (pause)
React app boots, requests JSON from backend ---> Content visible
                                           (pause)
```

This is not the most efficient solution for getting content to a user quickly. There are 3 roundtrip requests to a server before any content is visible! **This is the problem SSR solves.**

## SSR Overview

When you make the initial request to a SSR React app, it comes back with an HTML file full of content. It also comes with a script tag for the JS bundle, but the very first render happens server side. This gets content in front of the user as fast as possible.

```
time
--->
Browser requests page ---> Content visible
                    (pause)
```

In more detail:

```
Browser side                                        Server side
==================================================================================
User navigates to
ourApp.com              --------------------->      Receive request
                                                            v
                                                    Load React app in memory
                                                            v
                                                    Fetch any required data
                                                            v
                                                    Render the React app
                                                            v
HTML doc                <---------------------      Respond with generated HTML
    v
Content visible!
    v
HTML says browser
needs bundle.js         --------------------->      Receive request
                                                            v
Get bundle.js           <---------------------      Respond with bundle.js
React app boots up
```

## Webpack + Babel setup

In order to be able to run React code (JSX, ES modules, etc.) server side we need to transpile our code with Babel and bundle it with Webpack.

This is our initial setup:

```js
const path = require("path");

module.exports = {
  // Inform Webpack that we're building a bundle for Node
  target: "node",

  // root file of our application
  entry: path.resolve(__dirname, "src/index.js"),

  // where to put the generated bundle
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },

  // transpile every file with Babel
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            "react",
            "stage-0",
            ["env", { targets: { browsers: ["last 2 versions"] } }]
          ]
        }
      }
    ]
  }
};
```

## SSR vs Universal JS vs Isomorphic

Server Side Rendering means that HTML is generated server side (e.g. React, EJS templates, etc.)

Universal/Isomorphic JS means that some code in our project runs both on the server and the browser

## Client Side functionality

Let's say we add some functionality to our Home component to run browser side.

```js
import React from "react";

const Home = () => (
  <div>
    <div>I'm the BEST Home component</div>
    <button onClick={() => console.log("Hello")}>Click me!</button>
  </div>
);

export default Home;
```

When we serve this and click the button, nothing happens. This because what the server served and the browser rendered is a string of static HTML.

In a normal React app, this is what would happen:

```
Browser gets index.html, renders it (empty content)
        v
Browser gets bundle.js
        v
React app boots up, renders components to DOM
        v
React sets up event handlers
```

With our current setup, there is no JS code being sent to the browser, only HTML.

To solve this issue we need to create 2 separate bundles: one for our server code + React app (run on the server) and one for just the React app (run on the browser).

- Make our server statically serve our client bundle
- Add a script tag for the client bundle to the root route HTML document
- Make client.js render the React app again, overwriting the static HTML we sent from the server --> hydration
- From this point React "takes over" browser side

```js
import React from "react";
import ReactDOM from "react-dom";

import Home from "./components/Home";

ReactDOM.hydrate(<Home />, document.getElementById("root"));
```