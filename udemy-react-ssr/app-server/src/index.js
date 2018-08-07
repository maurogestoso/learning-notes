import "babel-polyfill";
import express from "express";
import createStore from "./helpers/createStore";
import renderer from "./helpers/renderer";
import { matchRoutes } from "react-router-config";
import routes from "./client/routes";

const app = express();

app.use(express.static("public"));

app.get("*", (req, res) => {
  const store = createStore();

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
