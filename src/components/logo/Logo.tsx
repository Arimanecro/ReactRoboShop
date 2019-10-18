import React from "react";

export default React.memo(() => {
  return (
    <section className="header__logo">
      <figure>
        <svg
          width="110"
          height="138"
          style={{ background: "url(./img/logo.svg) no-repeat" }}
        />
        <figcaption>
          <p>Robo</p>
          <p>online store</p>
        </figcaption>
      </figure>
    </section>
  );
});
