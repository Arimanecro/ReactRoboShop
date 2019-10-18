import React from "react";
import Basket from "../../../classes/Basket";
import { Store } from "../../hoc/CentralStore";

interface IProps {
  params: any;
  id: string;
}

interface IState {
  click?: boolean;
}

export default class BtnBasket extends React.Component<IProps, IState> {
  constructor(props: IProps, public state: IState, public className: string) {
    super(props);
    this.state = { click: false };
  }

  render() {
    let bg = false;

    if (localStorage.getItem("basket")) {
      bg = Object.keys(JSON.parse(localStorage.getItem("basket"))).includes(
        String(this.props.id)
      );
    }
    return (
      <Store.Consumer>
        {(value: any) => (
          <button
            onClick={(e: any) => {
              self.trigger = "click";
              Basket.add(
                e,
                this.props.params,
                bg,
                this.setState.bind(this),
                value.refresh,
                value.shake,
                this.state
              )
            }

            }
            style={
              bg || this.state.click
                ? { background: "url(../img/adding_basket_btn.png)" }
                : { background: "url(../img/basket_btn.png)" }
            }
            name="add_basket"
            id="add_basket"
            className="add_basket"
          />
        )}
      </Store.Consumer>
    );
  }
}
