import React from "react";

export default React.memo(() => {
  return (
    <footer className="application__footer">
      <div className="wrapp_footer">
        <div className="footer_robo" />
        <section className="footer_info">
          <h1>information</h1>
          <p>about_us</p>
          <p>customers</p>
          <p>privacy police</p>
        </section>
        <section className="footer_contact">
          <h1>Contacts</h1>
          <p>my company</p>
          <p>111-222-333</p>
          <p>info@email.com</p>
        </section>
      </div>
    </footer>
  );
});
