import React from "react";
import { Link } from "react-router-dom";
import ShoppingCart from "../UI/carts/ShoppingCart";
import WishListCart from "../UI/carts/WishListCart";

export default (props: any) => {
  return (
    <nav className="nav_up" style={props.item ? { width: "100%" } : null}>
      <ul>
        <li>
          <Link to="">Home</Link>
        </li>
        <WishListCart />
        <ShoppingCart />
        <label htmlFor="currency">
          <span>{JSON.parse(localStorage.getItem("currency"))["name"]}</span>
        </label>
      </ul>
    </nav>
  );
};
