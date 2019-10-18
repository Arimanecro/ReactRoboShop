import React from "react";
import { Store } from "./hoc/CentralStore";
import HeaderForItem from "./tpl/HeaderForItem";
import Footer from "./tpl/Footer";
import WishListItem from "./UI/items/WishListItem";
import MobileLogo from "./logo/MobileLogo";
import Logo from "./logo/Logo";
import Search from "./search/Search";
import Bar from "./menu/BarMenu";
import Currency from "../classes/Currency";
import Packaging from "./hoc/Packaging";
import DeleteAllBtn from "./UI/buttons/DeleteAllBtn";
import BasketPage from "./BasketPage";

export default class WishListPage extends BasketPage {
  showItem(item: any, v: string, k: number) {
    return (
      <WishListItem
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
    let basket = JSON.parse(localStorage.getItem("wishlist"));
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
                <Bar
                  shake={this.state.shake}
                  item={true}
                  observerCount={this.state.countBasket}
                  observerWishList={this.state.countWishList}
                />
                <Currency />
                <div className="application__content">
                  <main>
                    <section className="latest title_category_items basket_items">
                      Wish List
                    </section>
                    <Packaging name="WishList">
                      <section className="wish_list">
                        <div
                          className="wish_list__robo"
                          style={{
                            background: "url('/img/robo_wish.svg') no-repeat"
                          }}
                        />
                        <div className="wrapp_wishlist">
                          {Object.keys(
                            JSON.parse(localStorage.getItem("wishlist"))
                          ).map((v: string, k: number) =>
                            this.showItem(basket, v, k)
                          )}
                        </div>
                      </section>
                      <div className="wrapp_btns" style={{ display: "block" }}>
                        <DeleteAllBtn name={"wishlist"} />
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
