import React from "react";

export default React.memo(() => {
  return (
    <section className="header__mobilelogo">
      <a href="/">
        <figure>
          <svg width="65" height="75">
            <image xlinkHref="./img/logo.svg" width="55" height="75" />
          </svg>
          <figcaption>
            <p>Robo</p>
            <p>online store</p>
          </figcaption>
        </figure>
      </a>
    </section>
  );
});
