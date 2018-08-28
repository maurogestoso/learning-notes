import "babel-polyfill";
import express from "express";
import proxy from "express-http-proxy";
import { matchRoutes } from "react-router-config";
import routes from "./client/routes";
import createStore from "./helpers/createStore";
import renderer from "./helpers/renderer";

const app = express();

app.use(
  "/api",
  proxy("http://react-ssr-api.herokuapp.com", {
    proxyReqOptDecorator(options) {
      /*
        This header says to the API server:
        "The origin of this request is localhost:3000"
        The API server will add a query param to the google auth URL to redirect
        to the origin once authentication is done
      */
      options.headers["x-forwarded-host"] = "localhost:3000";
      return options;
    }
  })
);

app.use(express.static("public"));

app.get("*", (req, res) => {
  const store = createStore(req);

  const dataLoadingPromises = matchRoutes(routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  });

  Promise.all(dataLoadingPromises).then(results => {
    console.log("server: Finished loading data");
    const context = {};
    const content = renderer(req, store, context);

    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
