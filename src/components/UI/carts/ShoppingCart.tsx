import React from "react";
import { Link } from "react-router-dom";
import { Store } from "../../hoc/CentralStore";

export default React.memo(() => {
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
          onAnimationEnd={() => {
            value.refresh({ shake: false });
          }}
          style={value.shake == "basket" ? animation : null}
        >
          <Link to="/basket">Shopping cart&nbsp;[{value.countBasket}] </Link>
        </li>
      )}
    </Store.Consumer>
  );
});
