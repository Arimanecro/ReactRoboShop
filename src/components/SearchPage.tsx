import React from "react";
import Category from "./Category";
import SearchItems from "../components/search/SearchItems";

export default class SearchPage extends Category {
  componentDidMount() {}
  componentDidUpdate(){}

  blocks = () => {
    return (
      <SearchItems
        search={this.state.search}
        searchTape={this.state.searchTape}
      />
    );
  };
}
