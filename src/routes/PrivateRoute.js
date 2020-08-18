import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useLocalStorage } from "../database/useLocalStorage";

function PrivateRoute({ children, ...rest }) {
  const [loggedUser] = useLocalStorage();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
