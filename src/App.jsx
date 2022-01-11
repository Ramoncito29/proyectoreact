import React, { Component } from "react";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ShoppingCart from "./ShoppingCart";
import customersList from "./customersList";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import NoMatchPage from "./NoMatchPage";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <div className="container-fluid">
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/customers" exact element={<customersList />} />
            <Route path="/cart" exact element={<ShoppingCart />} />
            <Route path="*" exact element={<NoMatchPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
