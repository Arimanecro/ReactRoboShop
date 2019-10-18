import React, { Component } from "react";
export const Store = React.createContext({});

interface IState {
  goods: any[];
  countBasket: number;
  countWishList: number;
  category?: string;
  redirect?: boolean;
  shake: boolean;
  searchTape: boolean;
  updateCurrency: boolean;
}

export default class CentralStore extends Component<{}, IState> {
  count = 0;

  constructor(props, public refreshState) {
    super(props);
    this.refreshState = this.setState.bind(this);
    this.state = {
      goods: null,
      redirect: false,
      countBasket: Object.keys(JSON.parse(localStorage.getItem("basket")))
        .length,
      countWishList: Object.keys(JSON.parse(localStorage.getItem("wishlist")))
        .length,
      updateCurrency: true,
      shake: false,
      searchTape: false
    };
  }

  render() {
    return (
      <Store.Provider value={{ ...this.state, refresh: this.refreshState }}>
        {this.props.children}
      </Store.Provider>
    );
  }
}
