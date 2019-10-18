import React from "react";
import { decodeHTML } from "entities";
import { HashLink as Link } from "react-router-hash-link";
import Currency from "../../classes/Currency";
const shortid = require("shortid");

function randomItem(end: number): number {
  return Math.floor(Math.random() * end) + 1;
}

export default (props: any) => {
  let showGoods = () => {
    const items = props.goods.slice(26, 30).map((g: any) => {
      g.img_medium = g.img_medium.replace(/public/gi, "");
      return (
        <article className="item_special" key={shortid.generate()}>
          <span className="sale" />
          <div
            className="item__img"
            style={{
              background: `url(${g.img_medium}) no-repeat`,
              backgroundSize: "contain",
              backgroundPosition: "center"
            }}
          />
          <div className="item__desc">
            <Link to={"item/" + g.url}>{decodeHTML(g.title)}</Link>
          </div>
          <div className="item__price">{Currency.currencyPrice(g.price)}</div>
        </article>
      );
    });
    return <>{items}</>;
  };
  return (
    <>
      <div className="specials">Specials</div>
      {showGoods()}
    </>
  );
};
