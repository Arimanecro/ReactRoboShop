import React from "react";
import { Store } from "../components/hoc/CentralStore";
import { decodeHTML } from "entities";
import axios from "axios";

interface List {
  USD: number;
  GBP: number;
  EUR: number;
  time: number;
}

export default class Currency extends React.Component {
  constructor(props) {
    super(props);
  }

  static requestCurrency() {
    if (localStorage.getItem("listcurrency")) {
      let now = Math.floor(new Date().valueOf() / 1000);
      let time = now - JSON.parse(localStorage.getItem("listcurrency"))["time"];
      if (time > 180000) {
        Currency.converter();
      }
    } else {
      Currency.converter();
    }
  }

  static converter() {
    return axios
      .get(
        "https://free.currconv.com/api/v7/convert?q=USD_EUR,USD_GBP&compact=ultra&apiKey=a498394ec35761626eaa"
      )
      .then(function (response: any) {
        let pares: List = { EUR: null, GBP: null, USD: null, time: null };
        pares["EUR"] = response.data.USD_EUR;
        pares["GBP"] = response.data.USD_GBP;
        pares["USD"] = 1;
        pares["time"] = Math.floor(new Date().valueOf() / 1000);
        localStorage.setItem("listcurrency", JSON.stringify(pares));
      })
      .catch((e: string) => new Error(e));
  }

  static addCurrency(name: string) {
    let n = "";
    switch (name) {
      case "pound":
        n = "GBP";
        break;
      case "dollar":
        n = "USD";
        break;
      case "euro":
        n = "EUR";
        break;
    }
    let rate = JSON.parse(localStorage.getItem("listcurrency"))[n];
    localStorage.setItem(
      "currency",
      JSON.stringify({ name: n, rate: rate ? rate : 1 })
    );
  }

  static checkCurrency() {
    Currency.requestCurrency();
    return !localStorage.getItem("currency")
      ? localStorage.setItem(
        "currency",
        JSON.stringify({ name: "USD", rate: 1 })
      )
      : null;
  }

  static getSymbol() {
    let name = JSON.parse(localStorage.getItem("currency"))["name"];
    let symbol = "";
    switch (name) {
      case "EUR":
        symbol = "&euro;";
        break;
      case "USD":
        symbol = "&dollar;";
        break;
      case "GBP":
        symbol = "&pound;";
        break;
      default:
        symbol = "&euro;";
    }
    return symbol;
  }

  static flag() {
    let name = JSON.parse(localStorage.getItem("currency"))["name"];
    let flag = "";
    switch (name) {
      case "EUR":
        flag = "eu.svg";
        break;
      case "USD":
        flag = "us.svg";
        break;
      case "GBP":
        flag = "gb.svg";
        break;
      default:
        flag = "eu.svg";
    }
    return flag;
  }

  static currencyPrice(price: number) {
    return (
      String(
        (price * JSON.parse(localStorage.getItem("currency"))["rate"]).toFixed(2)
      ) +
      " " +
      decodeHTML(Currency.getSymbol())
    );
  }

  showMenuCurrency() {
    let list_symbols = ["euro", "pound", "dollar"];

    const symbols = list_symbols.map((v: any, k: any) => {
      return (
        <Store.Consumer key={k}>
          {(value: any) => (
            <>
              <label
                key={k}
                onClick={() => {
                  self.trigger = "click";
                  Currency.addCurrency(v);
                  value.refresh({ updateCurrency: !value.changeValue });
                }}
                className={v}
                htmlFor={v}
              >
                <button id={v} name={v} />
              </label>
            </>
          )}
        </Store.Consumer>
      );
    });
    return <>{symbols}</>;
  }

  render() {
    let obj = `
        .nav_up ul label:before {
            background:url(/img/arrow.png)  no-repeat, url(/img/${Currency.flag()}) no-repeat;
            background-position: left, right;
            background-size: auto, contain;
        }
        @media all and (max-width:401px) { .nav_up ul label:before  {background:url(/img/arrow.png) no-repeat; background-position: center; width:15px}
        }`;
    return (
      <>
        <style>{obj}</style>
        <input name="currency" type="checkbox" id="currency" />
        <div className="list_currency">
          <form
            onSubmit={(e: React.FormEvent) => e.preventDefault()}
            method="post"
            id="form_currency"
            action="exchange"
          >
            {this.showMenuCurrency()}
          </form>
        </div>
      </>
    );
  }
}
