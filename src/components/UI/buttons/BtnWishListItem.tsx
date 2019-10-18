import React from "react";
import WishList from "../../../classes/WishList";
import BtnWishList from "./BtnWishList";
import { Store } from "../../hoc/CentralStore";

export default class BtnWishListItem extends BtnWishList {
  render() {
    let bg = false;
    if (localStorage.getItem("wishlist")) {
      bg = Object.keys(JSON.parse(localStorage.getItem("wishlist"))).includes(
        String(this.props.id)
      );
    }
    return (
      <Store.Consumer>
        {(value: any) => (
          <label
            id="btn_wishlist"
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              WishList.add(
                e,
                this.props.params,
                bg,
                this.setState.bind(this),
                value.refresh,
                this.state
              )
            }
            style={
              bg || this.state.click
                ? { backgroundColor: "#ffa726" }
                : { backgroundColor: "#bbbcbd" }
            }
          />
        )}
      </Store.Consumer>
    );
  }
}
