import axios from "axios";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "../client/reducers";

export default req => {
  const axiosInstance = axios.create({
    baseURL: "http://react-ssr-api.herokuapp.com",
    headers: {
      cookie: req.get("cookie") || "" // forward cookie from browser
    }
  });

  const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );
  return store;
};
