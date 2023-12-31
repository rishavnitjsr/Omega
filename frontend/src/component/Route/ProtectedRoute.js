import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, element: Element, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  //console.log(Element)
  //console.log({...rest})

  if (!loading) {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    if (isAdmin === true && user.role !== "admin") {
      return <Navigate to="/login" replace />;
    }

    return Element;
  }
}

export default ProtectedRoute;