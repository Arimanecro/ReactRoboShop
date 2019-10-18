import React from "react";
import WishListCartMobile from "../../UI/carts/WishListCartMobile";
import ShoppingCartMobile from "../../UI/carts/ShoppingCartMobile";

export default () => {
  return (
    <nav className="mobile_nav">
      <ul>
        <li>
          <label onClick={() => {
            let el: HTMLDivElement = document.querySelector('.cool_mob_menu');
            el.style.removeProperty('left');
            el.style.left = '0%';
          }} htmlFor="show_menu" id="check_menu" />
        </li>
        <WishListCartMobile />
        <ShoppingCartMobile />
        <label htmlFor="currency_mobile">
          <span>{JSON.parse(localStorage.getItem("currency"))["name"]}</span>
        </label>
      </ul>
    </nav>
  );
};
