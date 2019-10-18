import React from "react";

export default (props: any) => {
  return (
    <>
      <section id="top" className="latest title_category_items">
        {props.category[0].toUpperCase() + props.category.slice(1)}
      </section>
      <section className="latest_wrapper category_items">
        <div className="loader" />
      </section>
    </>
  );
};
