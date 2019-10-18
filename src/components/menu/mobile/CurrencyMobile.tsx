import Currency from "../../../classes/Currency";
import React from "react";

export default class CurrencyMobile extends Currency {
  render() {
    let obj = `

        .mobile_nav ul label:before {
            background:url(/img/arrow.png)  no-repeat, url(/img/${CurrencyMobile.flag()}) no-repeat;
            background-position: left, right;
            background-size: auto, contain;
        }

        `;
    return (
      <>
        <style>{obj}</style>
        <input name="currency_mobile" type="checkbox" id="currency_mobile" />
        <div className="list_currency_mobile">
          <form
            onSubmit={(e: React.FormEvent) => e.preventDefault()}
            method="post"
            id="form_currency_mobile"
            action="exchange"
          >
            {this.showMenuCurrency()}
          </form>
        </div>
        <input name="show_menu" type="checkbox" id="show_menu" />
      </>
    );
  }
}
