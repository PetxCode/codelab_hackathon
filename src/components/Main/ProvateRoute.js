import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const ProvateRoute = ({ component: PropsComp, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(Props) => {
        return currentUser ? (
          <PropsComp {...Props} />
        ) : (
          <Redirect to="/register" />
        );
      }}
    />
  );
};

export default ProvateRoute;
