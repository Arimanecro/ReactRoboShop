import React from "react";
import { Store } from "../../hoc/CentralStore";

export default function DeleteAllBtn(props: any) {
  return (
    <Store.Consumer>
      {(value: any) => (
        <label
          onClick={() => {
            if (props.name == "basket") {
              localStorage.setItem("basket", "{}");
              value.refresh({ countBasket: 0 });
            } else {
              localStorage.setItem("wishlist", "{}");
              value.refresh({ countWishList: 0 });
            }
          }}
          htmlFor="del"
          className="del"
          style={props.name == "wishlist" ? { float: "right" } : null}
        >
          Delete All
        </label>
      )}
    </Store.Consumer>
  );
}
