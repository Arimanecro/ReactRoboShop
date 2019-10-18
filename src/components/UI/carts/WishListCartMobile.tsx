import React from "react";
import { Link } from "react-router-dom";
import { Store } from "../../hoc/CentralStore";

export default () => {
  let animation = {
    animationName: "shake",
    animationDuration: "100ms",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: 4
  };

  return (
    <Store.Consumer>
      {(value: any) => (
        <li
          onAnimationEnd={() => value.refresh({ shake: false })}
          style={value.shake == "wishlist" ? animation : null}
        >
          <Link to="/wishlist">
            <span>Wish List</span>&nbsp;
            <span className="hide">[{value.countWishList}]</span>
          </Link>
        </li>
      )}
    </Store.Consumer>
  );
};
