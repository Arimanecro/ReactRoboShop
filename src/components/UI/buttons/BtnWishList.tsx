import React from "react";
import WishList from "../../../classes/WishList";
import { Store } from "../../hoc/CentralStore";

interface IProps {
  params: any;
  id: string;
}

interface IState {
  click?: boolean;
}

export default class BtnWishList extends React.Component<IProps, IState> {
  constructor(props: IProps, public state: IState, public className: string) {
    super(props);
    this.state = { click: false };
  }

  render() {
    let bg = false;
    if (localStorage.getItem("wishlist")) {
      bg = Object.keys(JSON.parse(localStorage.getItem("wishlist"))).includes(
        String(this.props.id)
      );
    }
    return (
      <Store.Consumer>
        {(value: any) => (
          <button
            onClick={(e: React.MouseEvent) => {
              self.trigger = "click";
              WishList.add(
                e,
                this.props.params,
                bg,
                this.setState.bind(this),
                value.refresh,
                this.state
              )
            }
            }
            style={
              bg || this.state.click
                ? { background: "url(../img/adding_wish_btn.png)" }
                : { background: "url(../img/wish_btn.png)" }
            }
            name="add_wish"
            className="add_wish"
          />
        )}
      </Store.Consumer>
    );
  }
}
