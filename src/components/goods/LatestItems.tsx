import React from "react";
import { decodeHTML } from "entities";
import BtnBasket from "../UI/buttons/BtnBasket";
import BtnWishList from "../UI/buttons/BtnWishList";
import { HashLink as Link } from "react-router-hash-link";
import Currency from "../../classes/Currency";
const shortid = require("shortid");

export default (props: any) => {
  let showGoods = () => {
    const items = props.goods.slice(0, 4).map((g: any) => {
      g.img_medium = g.img_medium.replace(/public/gi, "");
      return (
        <article className="latest__item" key={shortid.generate()}>
          <span />
          <div
            className="latest__item__img"
            style={{
              background: `url(${g.img_medium}) no-repeat`,
              backgroundSize: "contain",
              backgroundPosition: "center"
            }}
          />
          <div className="item__price"> {Currency.currencyPrice(g.price)} </div>
          <Link to={"item/" + g.url}>
            <div className="latest__item__desc">{decodeHTML(g.title)}</div>
          </Link>
          <form method="post" onSubmit={(e: any) => e.preventDefault()}>
            <BtnBasket params={{ ...g }} id={g.id} />
            <BtnWishList params={{ ...g }} id={g.id} />
          </form>
        </article>
      );
    });
    return <>{items}</>;
  };
  return (
    <>
      <section className="latest">Latest</section>
      <section className="latest_wrapper "> {showGoods()} </section>
    </>
  );
};
