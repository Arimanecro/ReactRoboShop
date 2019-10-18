import React from "react";
import { Store } from "./hoc/CentralStore";
import { Link } from "react-router-dom";
import Currency from "../classes/Currency";
import Packaging from "./hoc/Packaging";
import Item from "./Item";
import Logo from "./logo/Logo";
import MobileLogo from "./logo/MobileLogo";
import Bar from "./menu/BarMenu";
import Search from "./search/Search";
import Footer from "./tpl/Footer";
import HeaderForItem from "./tpl/HeaderForItem";
import DeleteAllBtn from "./UI/buttons/DeleteAllBtn";
import BasketItem from "./UI/items/BasketItem";
import Total from "./UI/items/TotalSum";

export default class BasketPage extends Item {

  componentDidMount() { }

  componentWillUpdate() {
    this.total = 0;
  }

  total = 0;

  showItem(item: [], v: string, k: number) {
    this.total += item[v]["price"] * (item[v]["qty"] ? item[v]["qty"] : 1);

    return (
      <BasketItem
        {...item[v]}
        id={v}
        parentState={this.state.changeQty}
        changeQty={this.setState.bind(this)}
        endTransition={this.state.endTransition}
        shake={this.state.shake}
      />
    );
  }

  render() {
    let basket = JSON.parse(localStorage.getItem("basket"));
    return (
      <Store.Consumer>
        {(value: any) => (
          <>
            <HeaderForItem />
            <div className="gray_line" />
            <div className="application">
              <div className="application__content-wrapper">
                <header>
                  <MobileLogo />
                  <Logo />
                  <Search cnx={this.props.items} parentState={value.refresh} />
                  <section className="phone">
                    <span>111-222-333</span>
                  </section>
                </header>
                <Bar item={true} />
                <Currency />
                <div className="application__content">
                  <main>
                    <section className="latest title_category_items basket_items">
                      Basket
                    </section>
                    <Packaging name="Basket">
                      <section className="wish_list">
                        <div
                          className="wish_list__robo"
                          style={{
                            background: "url('/img/robo_wish.svg') no-repeat"
                          }}
                        />
                        <div className="wrapp_wishlist">
                          {Object.keys(
                            JSON.parse(localStorage.getItem("basket"))
                          ).map((v: string, k: number) =>
                            this.showItem(basket, v, k)
                          )}
                          <Total sum={this.total} />
                          {(this.total = null)}
                        </div>
                      </section>
                      <div className="wrapp_btns">
                        <Link to="/order">
                          <label htmlFor="orders" className="orders">
                            Order
                            <input
                              form="del_up"
                              type="submit"
                              name="orders"
                              id="orders"
                              value=""
                            />
                          </label>
                        </Link>
                        <DeleteAllBtn name={"basket"} />
                      </div>
                    </Packaging>
                  </main>
                  <Footer />
                </div>
              </div>
            </div>
          </>
        )}
      </Store.Consumer>
    );
  }
}