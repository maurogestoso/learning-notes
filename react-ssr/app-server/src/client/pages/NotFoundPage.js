import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true; // only server-side

  return (
    <div>
      <h1>Ooops, route not found.</h1>
      <Link to="/">Go back home</Link>
    </div>
  );
};

export default {
  component: NotFoundPage
};
