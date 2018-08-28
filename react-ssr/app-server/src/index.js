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
      // to do with Google auth and the react-ssr-api
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
    res.send(renderer(req, store));
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
