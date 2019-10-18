import React from "react";
import { Store } from "../../hoc/CentralStore";
import { decodeHTML } from "entities";
import Currency from "../../../classes/Currency";
import Basket from "../../../classes/Basket";
import TrashBtn from "../buttons/TrashBtn";
import BasketItem from "./BasketItem";

interface Iprops {
  img_small: string;
  url: string;
  title: string;
  price: number;
  id: string;
  changeQty: (obj: any) => {};
  parentState: string;
  qty: string;
  endTransition: string;
  shake: any;
}

export default class WishListItem extends BasketItem {
  constructor(props: Iprops, public state: any) {
    super(props);
    this.state = { transformCSS: "0" };
  }

  transitionEnd(refresh: (o: {}) => {}) {
    Basket.deleteItemFromBasket("wishlist", this.props.id);
    this.props.changeQty({ endTransition: !this.props.endTransition });
    this.setState({ transformCSS: "0" });

    refresh({
      countWishList: Object.keys(JSON.parse(localStorage.getItem("wishlist")))
        .length,
      shake: "wishlist"
    });
  }

  render() {
    return (
      <Store.Consumer>
        {(value: any) => (
          <div
            key={this.props.id}
            onTransitionEnd={() => {
              this.transitionEnd(value.refresh);
            }}
            className="wish_list__listing"
            style={{ transform: `translate(${this.state.transformCSS}%)` }}
          >
            <ul>
              <li
                style={{
                  background: `url(${this.props.img_small.replace(
                    /public/gi,
                    ""
                  )}) no-repeat center`,
                  backgroundSize: `contain`
                }}
              />
              <li>
                <a href={`item/` + this.props.url}>
                  {decodeHTML(this.props.title)}
                </a>
              </li>
              <li>{Currency.currencyPrice(this.props.price)}</li>
              <TrashBtn
                transformCSS={this.setState.bind(this)}
                parent={this.props.changeQty}
              />
            </ul>
          </div>
        )}
      </Store.Consumer>
    );
  }
}
