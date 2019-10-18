import React from "react";

export default React.memo(() => {
  return (
    <section className="slider">
      <ul className="rslides">
        <li>
          <div className="desc">
            <h1>Electrolux &apos;Supercyclone&apos; Vacuum Cleaner</h1>
            <p>
              Comfort is a very important thing nowadays because it is a
              condition of satisfaction
            </p>
            <a href="/category/Vacuum-Cleaner" className="btn_details">
              Details
            </a>
          </div>
          <div className="img_product">
            <img src="./img/items/product-1-448.png" alt="" />
          </div>
        </li>
        <li>
          <div className="desc">
            <h1>Panasonic HC-VX870 4K Ultra HD Camcorder</h1>
            <p>
              Comfort is a very important thing nowadays because it is a
              condition of satisfaction
            </p>
            <a href="/category/cameras" className="btn_details">
              Details
            </a>
          </div>
          <div className="img_product">
            <img src="./img/items/product-34-448.png" alt="" />
          </div>
        </li>
        <li>
          <div className="desc">
            <h1>Siemens Steam Iron </h1>
            <p>
              Comfort is a very important thing nowadays because it is a
              condition of satisfaction
            </p>
            <a href="/category/irons" className="btn_details">
              Details
            </a>
          </div>
          <div className="img_product">
            <img src="./img/items/product-55-448.png" alt="" />
          </div>
        </li>
      </ul>
    </section>
  );
});
