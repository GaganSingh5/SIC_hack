import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Auth from "../Auth/Auth";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function Navbar() {
  // const { isAuthenticated } = useAuth0();
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-6">
          <h3 className="header--text px-5 mx-5">Sharing Is Caring</h3>
        </div>
        <div className="col-4">
          <Link to="../">Home</Link>
          <Link className="mx-3" to="/requests">
            My Requests
          </Link>
        </div>
        <div className="col-2 d-flex justify-content-end">
          <Auth></Auth>
        </div>
      </div>
    </div>
  );
}

export default Navbar
