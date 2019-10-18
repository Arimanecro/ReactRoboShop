interface PropertiesOfItem {
  id: string;
  img_small: string;
  title: string;
  url?: string;
  price: string;
  qty?: string;
}

export default class Basket {
  static add(
    event: React.MouseEvent,
    i: PropertiesOfItem,
    bg: boolean,
    change: (o?: { 'click'?: boolean }) => void,
    changeState: (o: object) => void,
    shake: boolean,
    parentState: { click?: boolean }
  ) {
    event.preventDefault();

    const arr = {};
    const { id, price, title, img_small, url, qty } = i;
    const item = { price, title, url, img_small, qty };
    arr[id] = { ...item };

    if (localStorage.getItem("basket") == "0") {
      localStorage.setItem("basket", JSON.stringify(arr));
    } else {
      if (!parentState.click && bg) {
        let parse = JSON.parse(localStorage.getItem("basket"));
        delete parse[id];
        localStorage.setItem("basket", JSON.stringify({ ...parse }));
        change({ click: false });
      } else {
        if (!bg) {
          let parse = JSON.parse(localStorage.getItem("basket"));
          localStorage.setItem("basket", JSON.stringify({ ...arr, ...parse }));
          change({ click: false });
        }
      }
    }

    changeState({
      countBasket: Object.keys(JSON.parse(localStorage.getItem("basket")))
        .length,
      shake: "basket"
    });
  }

  static updateBasket(id: string, qty: string) {
    let basket = JSON.parse(localStorage.getItem("basket"));
    basket[id]["qty"] = qty;
    return localStorage.setItem("basket", JSON.stringify(basket));
  }

  static deleteItemFromBasket(name: string, id: string) {
    if (name == "basket") {
      let parse = JSON.parse(localStorage.getItem("basket"));
      delete parse[id];
      return localStorage.setItem("basket", JSON.stringify({ ...parse }));
    } else {
      let parse = JSON.parse(localStorage.getItem("wishlist"));
      delete parse[id];
      return localStorage.setItem("wishlist", JSON.stringify({ ...parse }));
    }
  }

  static checkBasket() {
    return !localStorage.getItem("basket")
      ? localStorage.setItem("basket", "0")
      : null;
  }
}
