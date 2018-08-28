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

## Routes

http://react-ssr-api.herokuapp.com

- /users
- /admins
- /auth/google
- /current_user
- /logout

## State Management

### Reducers

- users
- admins
- auth

### Action Creators

- fetchUsers
- fetchAdmins
- fetchCurrentUsers

### 4 Big Challenges

- Redux needs different config on server and client
- Aspects of auth need to be handled on the server. Normally this is only on browser!
- Way of detecting when all initial data load actions are completed on server
- State rehydration on client

### 1. Data Loading on Server

The problem with data loading is that `renderToString` doesn't call the lifecycle methods of a component. This means that our traditional method for loading data into a component with `componentDidMount` won't work.

The following approach is similar to what frameworks like Next.js use to load data server-side:

```
Figure out what components to render (based on URL)
          v
Call a "loadData" method attached to each component
          v
      wait for response...
          v
Somehow detect all requests are complete
          v
Render app with collected data
          v
Send response to browser
```

Pros:

- Only render the app once
- Makes data requirements of each component clear

Cons:

- Requires a ton of code

`react-router-config` allows us to configure our routes as a JSON array of objects. It's an official React Router library designed to solve problems with SSR. Our routes will now look like:

```js
// src/client/Routes.js
import React from "react";
import Home from "./components/Home";
import UsersList from "./components/UsersList";

export default [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/users",
    component: UsersList
  }
];
```

To render these routes we can use the `renderRoutes` helper from `react-router-config`:

```js
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
```

## Authentication

In client side rendered apps, authentication is a contract between the browser and the API.

```
Browser
  |
  |   Auth contract
  |
  v
API
```

In a server-side rendered app, this contract will be different:

```
Browser
  |
  |   Identifying info
  |
  v
Server
  |
  |   Identifying info
  |
  v
API
```

Cookie based authentication works for communicating between the browser and the API directly. But if we have a cookie issued by the API and we make a request to the app server, the app server won't be able to talk to the API on the browser's behalf.

To solve this, we are going to set up a proxy for the API server on our SSR server. This way, the browser won't event know that the API server exists, it will be the SSR server's job to forward auth requests appropriately.

### Why not JWTs?

Cookies are automatically attached to HTTP requests, JWTs are not. If we configure our server for JWT authentication and a user requests "/", they would have to make a 2nd request to send a JWT, defeating the purpose of SSR.
