import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import { decodeHTML } from "entities";
import BtnBasket from "../UI/buttons/BtnBasket";
import BtnWishList from "../UI/buttons/BtnWishList";
import Currency from "../../classes/Currency";
const shortid = require("shortid");

export default (props: any) => {
  function displayPages(size: number, perPage: number, click: number) {
    let arr: any[] = [];
    let count = Math.round(size / perPage) + 1;
    for (let i = 1; i < count; i++) {
      arr.push(
        <li key={shortid.generate()}>
          <Link
            onClick={() => (click = i)}
            smooth
            to={`/category/${props.page.category}/${i}/#top`}
          >
            {i}
          </Link>
        </li>
      );
    }
    return <>{arr}</>;
  }

  let showGoods: any = () => {
    if (props.goods) {
      let items = props.goods.map((val: any, k: any) => {
        return (
          <section className="latest_wrapper category_items" key={shortid.generate()}>
            {val.map((v: any, k: any) => {
              val[k].img_medium = val[k].img_medium.replace(/public/gi, "");
              return (
                <article
                  className="latest__item"
                  key={shortid.generate()}
                  style={{
                    borderTop: 0,
                    borderBottom: "rgba(0,0,0, 0.27) thin solid"
                  }}
                >
                  <div
                    className="latest__item__img"
                    style={{
                      background: `url(${v.img_medium}) no-repeat`,
                      backgroundSize: "contain",
                      backgroundPosition: "center"
                    }}
                  />
                  <div className="item__price">
                    {" "}
                    {Currency.currencyPrice(v.price)}{" "}
                  </div>
                  <Link to={"/item/" + v.url}>
                    <div className="latest__item__desc">
                      {decodeHTML(v.title)}
                    </div>
                  </Link>
                  <form method="POST" onSubmit={(e: any) => e.preventDefault()}>
                    <BtnBasket params={{ ...v }} id={v.id} />
                    <BtnWishList params={{ ...v }} id={v.id} />
                  </form>
                </article>
              );
            })}
          </section>
        );
      });
      return <>{items}</>;
    }
  };
  return (
    <>
      <section id="top" className="latest title_category_items">
        {props.page.category[0].toUpperCase() + props.page.category.slice(1)}
      </section>
      {showGoods()}
      <div className="paginator">
        <ul>
          {displayPages(props.page.size, props.page.perPage, props.clickPage)}
        </ul>
      </div>
      <section
        className="latest_wrapper bestsellers_wraper latest_featured"
        style={{ display: "block", marginBottom: 330 }}
      />
      {self.trigger !== "click" ? self.trigger = false : self.trigger = true}
    </>
  );
};
