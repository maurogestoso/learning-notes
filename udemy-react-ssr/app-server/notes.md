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

## SSR vs Universal JS vs Isomorphic

Server Side Rendering means that HTML is generated server side (e.g. React, EJS templates, etc.)

Universal/Isomorphic JS means that some code in our project runs both on the server and the browser
