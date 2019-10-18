import React from "react";
import Basket from "../../../classes/Basket";
import BtnBasket from "./BtnBasket";
import { Store } from "../../hoc/CentralStore";

export default class BtnBasketItem extends BtnBasket {
  render() {
    let bg = false;
    if (localStorage.getItem("basket")) {
      bg = Object.keys(JSON.parse(localStorage.getItem("basket"))).includes(
        String(this.props.id)
      );
    }
    return (
      <Store.Consumer>
        {(value: any) => (
          <label
            id="btn_basket"
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              Basket.add(
                e,
                this.props.params,
                bg,
                this.setState.bind(this),
                value.refresh,
                value.shake,
                this.state
              )
            }
            style={
              bg || this.state.click
                ? { backgroundColor: "rgba(42, 156, 188, 0.76)" }
                : { backgroundColor: "#bbbcbd" }
            }
          />
        )}
      </Store.Consumer>
    );
  }
}
