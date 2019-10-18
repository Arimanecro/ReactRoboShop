import React from "react";
import ItemView from "./goods/ItemView";
import { Redirect } from "react-router-dom";

interface IProps {
  items?: Title;
  title?: string;
}

interface IState {
  goods: object;
  redirect: boolean;
  qty?: number;
  errorsValidation: {};
  errorCount: number;
  addFirebase: boolean;
  disableBtn: boolean;
}

interface Title {
  collection: any;
}

export default class Item extends React.PureComponent<IProps, IState> {
  constructor(props: IProps, public state: any, public count: number) {
    super(props);
    this.state = {
      goods: false,
      redirect: false,
      qty: 0,
      changeQty: true,
      endTransition: true,
      transformCSS: "0",
      errorsValidation: {},
      errorCount: 0,
      disableBtn: false
    };
    this.count = 0;
  }

  componentDidMount() {
    this.props.items
      .collection("items")
      .where("url", "==", this.props.title)
      .limit(1)
      .get()
      .then((q: firebase.firestore.QuerySnapshot) => {
        if (!q.empty) {
          this.setState({ goods: q.docs[0].data() });
        } else {
          this.setState({ redirect: true });
        }
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/404" />;
    }
    return (
      <>
        {this.state.goods ? (
          <ItemView goods={this.state.goods} cnx={this.props.items} />
        ) : (
            <div className="loader" />
          )}
      </>
    );
  }
}
