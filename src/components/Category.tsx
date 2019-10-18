import React from "react";
import Home from "./Home";
import CategoryItems from "./goods/CategoryItems";
import CategoryPreloader from "./UI/preloaders/categoryPreloader";

export default class Category extends Home {
  count = 0;
  size = 0;
  perPage = 16;

  sendRequest() {
    let start: number = 0;

    this.props.items
      .collection("items")
      .where("category", "==", this.props.category)
      .get()
      .then((q: firebase.firestore.QuerySnapshot) => {
        if (!q.empty) {
          this.size = q.size;
          if (this.props.page > 1 && q.docs[0].data()) {
            let key = Math.round(q.size / this.props.page);

            start = key <= q.size ? q.docs[key].data()["id"] : q.docs[0]["id"];
          } else {
            start = q.docs[0].data()["id"];
          }

          this.props.items
            .collection("items")
            .where("category", "==", this.props.category)
            .orderBy("id")
            .startAt(start)
            .limit(this.perPage)
            .get()
            .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
              if (!querySnapshot.empty) {
                let newArr: any[] = [];
                querySnapshot.docs.forEach((v: firebase.firestore.QueryDocumentSnapshot,
                  k: number) => {
                  newArr.push(querySnapshot.docs[k].data());
                });
                newArr = this.chunk(newArr, 4);
                self.trigger = true;
                this.setState({ goods: newArr });

              } else {
                this.setState({ redirect: true });
              }
            });
        } else {
          this.setState({ redirect: true });
        }
      });

  }

  componentDidMount() {
    this.sendRequest();
  }

  componentDidUpdate(prevProps) {
    if (self.trigger !== 'click') {
      if ((prevProps.page !== this.props.page) || (prevProps.category !== this.props.category)) {
        this.sendRequest();
      }
    }
  }

  blocks(): any {
    if (this.state.goods && !this.state.redirect && self.trigger) {

      return (<CategoryItems
        goods={this.state.goods}
        page={{
          perPage: 16,
          size: this.size,
          category: this.props.category
        }}
        clickPage={this.props.page}
      />);
    }
    else {
      return <CategoryPreloader category={this.props.category} />
    }

  }

  chunk = (arr: any[], size: number) =>
    arr.reduce(
      (chunks, el, i) =>
        (i % size ? chunks[chunks.length - 1].push(el) : chunks.push([el])) &&
        chunks,
      []
    );
}
