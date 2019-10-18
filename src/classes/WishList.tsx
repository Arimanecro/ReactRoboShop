interface PropertiesOfItem {
  id: string;
  img_small: string;
  title: string;
  url?: string;
  price: string;
  qty?: string;
}

export default class WishList {
  static add(
    event: React.MouseEvent,
    i: PropertiesOfItem,
    bg: boolean,
    change: (o?: { 'click'?: boolean }) => void,
    changeState: (o: object) => void,
    parentState: { click?: boolean }
  ) {
    event.preventDefault();
    const arr: any = {};
    const { id, price, title, img_small, url, qty } = i;
    const item: any = { price, title, url, img_small, qty };
    arr[id] = { ...item };

    if (localStorage.getItem("wishlist") == "0") {
      localStorage.setItem("wishlist", JSON.stringify(arr));
    }
    else {
      if (!parentState.click && bg) {
        let parse = JSON.parse(localStorage.getItem("wishlist"));
        delete parse[id];
        localStorage.setItem("wishlist", JSON.stringify({ ...parse }));
        change({ click: false });
      }
      else {
        if (!bg) {
          let parse = JSON.parse(localStorage.getItem("wishlist"));
          localStorage.setItem(
            "wishlist",
            JSON.stringify({ ...arr, ...parse })
          );
          change({ click: false });
        }
      }
    }

    changeState({
      countWishList: Object.keys(JSON.parse(localStorage.getItem("wishlist")))
        .length,
      shake: "wishlist"
    });
  }

  static checkBasket() {
    return !localStorage.getItem("wishlist")
      ? localStorage.setItem("wishlist", "0")
      : null;
  }
}
