import React from "react";
import { Store } from "../../components/hoc/CentralStore";
import MobileLogo from "../logo/MobileLogo";
import Logo from "../logo/Logo";
import Search from "../search/Search";
import Bar from "../menu/BarMenu";
import HeaderForItem from "../tpl/HeaderForItem";
import Footer from "../tpl/Footer";
import { Link } from "react-router-dom";
import BtnBasketItem from "../UI/buttons/BtnBasketItem";
import BtnWishList from "../UI/buttons/BtnWishListItem";
import Currency from "../../classes/Currency";
import { decodeHTML } from "entities";

interface IProps {
  goods: any;
  cnx: any;
  items?: any;
  category?: string;
}

interface IState {
  redirect?: boolean;
  qty: string;
}

export default class ItemView extends React.PureComponent<IProps, IState> {
  constructor(props: IProps, public state: IState) {
    super(props);
    this.state = { qty: "1" };
  }

  render() {
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
                  <Search cnx={this.props.cnx} parentState={value.refresh} />
                  <section className="phone">
                    <span>111-222-333</span>
                  </section>
                </header>
                <Bar item={true} />
                <Currency />
                <div className="application__content">
                  <main>
                    <div className="category cat_item_cat">
                      <span>
                        <Link to={"/category/" + this.props.goods.category}>
                          {this.props.goods.category[0].toUpperCase() +
                            this.props.goods.category.slice(1)}
                        </Link>
                      </span>
                      <span>{decodeHTML(this.props.goods.title)}</span>
                    </div>
                  </main>
                </div>
                <section className="item_block">
                  <figure
                    className="item_block__img"
                    style={{
                      background: `url(${(this.props.goods.img_original = this.props.goods.img_original.replace(
                        /public/gi,
                        ""
                      ))}) no-repeat center`,
                      backgroundSize: "contain"
                    }}
                  />
                  <div className="item_block__params">
                    <h1>{decodeHTML(this.props.goods.title)}</h1>
                    <h2>{Currency.currencyPrice(this.props.goods.price)}</h2>
                    <p>
                      Availability: <span>In Stock</span>
                    </p>
                    <p>
                      Quantity{" "}
                      <input
                        onChange={e => this.setState({ qty: e.target.value })}
                        form="add_tools"
                        type="text"
                        name="qty"
                        defaultValue="1"
                      />
                    </p>
                  </div>
                </section>
                <form
                  method="POST"
                  id="add_tools"
                  onSubmit={(e: any) => e.preventDefault()}
                >
                  <BtnWishList
                    params={{ ...this.props.goods }}
                    id={this.props.goods.id}
                  />
                  <BtnBasketItem
                    params={{ ...this.props.goods, qty: this.state.qty }}
                    id={this.props.goods.id}
                  />
                </form>
                <article className="description_item">
                  <h1>Description</h1>
                  <p>
                    <span>{this.props.goods.description}</span>
                  </p>
                </article>
              </div>
              <Footer />
            </div>
          </>
        )}
      </Store.Consumer>
    );
  }
}
