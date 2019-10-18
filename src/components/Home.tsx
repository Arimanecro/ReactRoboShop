import React from "react";
import SliderMobile from "./UI/slider/SliderMobile";
import Slider from "./UI/slider/Slider";
import LatestPreloader from "./UI/preloaders/latestPreloader";
import FeaturedPreloader from "./UI/preloaders/featuredPreloader";
import LatestItems from "./goods/LatestItems";
import FeaturedItems from "./goods/FeaturedItems";
import Index from "../classes/abstract/Index";


export default class Home extends Index {
  count = 0;

  componentDidMount() {
    this.props.items
      .collection("items")
      .orderBy("id")
      .limit(30)
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        let newArr: any[] = [];
        querySnapshot.docs.forEach((v: firebase.firestore.QueryDocumentSnapshot) => { newArr.push(v.data()) });
        this.setState({ goods: newArr });
      });
  }

  blocks() {
    return [
      <SliderMobile />,
      <Slider />,

      this.state.goods ? (
        <LatestItems goods={this.state.goods} />
      ) : (
          <LatestPreloader />
        ),
      this.state.goods ? (
        <FeaturedItems goods={this.state.goods} />
      ) : (
          <FeaturedPreloader />
        )
    ];
  }
}
