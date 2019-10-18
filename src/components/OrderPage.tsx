import React from "react";
import { Store } from "./hoc/CentralStore";
import SimpleCrypto from "simple-crypto-js";
import Captcha from "../classes/Captcha";
import Currency from "../classes/Currency";
import Item from "./Item";
import Logo from "./logo/Logo";
import MobileLogo from "./logo/MobileLogo";
import Bar from "./menu/BarMenu";
import Search from "./search/Search";
import Footer from "./tpl/Footer";
import HeaderForItem from "./tpl/HeaderForItem";

export default class OrderPage extends Item {
  componentDidMount() { }
  componentDidUpdate() { }
  UNSAFE_componentWillUpdate() { }

  countErrors = {
    Name: {
      count: 0,
      click: 0,
      errMsg: " Minimum 4 characters and maximum 18",
      correct: false
    },
    Address: {
      count: 0,
      click: 0,
      errMsg: " Minimum 10 characters and maximum 40",
      correct: false
    },
    Email: { count: 0, click: 0, errMsg: " Incorrect email", correct: false },
    Captcha: { count: 0, click: 0, errMsg: " Incorrect value", correct: false }
  };

  customer = {};
  captcha = Captcha.generate();
  basketEmpty = Object.keys(JSON.parse(localStorage.getItem("basket"))).length;
  addSuccess = false;

  render() {
    return (
      <Store.Consumer>
        {(value: any) => (
          <>
            <HeaderForItem />
            <div className="gray_line" />
            <div className="application">
              <div className="application__content-wrapper">
                <header>
                  <MobileLogo />
                  <Logo />
                  <Search cnx={this.props.items} parentState={value.refresh} />
                  <section className="phone">
                    <span>111-222-333</span>
                  </section>
                </header>
                <Bar item={true} />
                <Currency />
                <div className="application__content">
                  <main>
                    <section className="latest title_category_items basket_items">
                      ORDER
                    </section>
                    {this.state.addFirebase ? this.success() : null}
                    {!this.basketEmpty ? (
                      <div className="errors">
                        <p>ERROR:</p>
                        <p>Your basket is empty!</p>
                      </div>
                    ) : null}
                    {this.state.errorCount >= 1 ||
                      Object.keys(this.state.errorsValidation).length
                      ? this.showErrors()
                      : null}
                    <div className="wrapp_order">
                      <div className="robo_order" />
                      <form
                        onSubmit={e => e.preventDefault()}
                        method="post"
                        id="order"
                      >
                        <input
                          onChange={e => this.validateName(e.target.value)}
                          name="name"
                          type="text"
                          placeholder="__FULL NAME__"
                        />
                        <input
                          onChange={e => this.validateAddress(e.target.value)}
                          name="address"
                          type="text"
                          placeholder="__ADDRESS__"
                        />
                        <input
                          onChange={e => this.validateEmail(e.target.value)}
                          name="email"
                          type="email"
                          placeholder="__EMAIL__"
                        />
                        <p>CAPTCHA</p>
                        <div
                          className="captcha"
                          style={{
                            background: `url('./img/captcha/${
                              this.captcha
                              }') no-repeat center center`,
                            backgroundSize: "contain"
                          }}
                        />
                        <input
                          onChange={e => this.validateCaptcha(e.target.value)}
                          name="captcha"
                          type="text"
                          placeholder="ROBOT OR HUMAN ?"
                        />
                        {!this.state.disableBtn ? (
                          this.btnOrder()
                        ) : (
                            <div className="loader" />
                          )}
                      </form>
                    </div>
                  </main>
                  <Footer />
                </div>
              </div>
            </div>
          </>
        )}
      </Store.Consumer>
    );
  }

  private validateName(text: string) {
    if (this.basketEmpty) {
      if ((text.length < 4) || text.length > 18) {
        ++this.countErrors.Name.count;
        ++this.countErrors.Name.click;

        this.setState({
          errorCount: this.state.errorCount + this.countErrors.Name.count,
          errorsValidation: {
            ...this.state.errorsValidation,
            Name: this.countErrors.Name.errMsg
          }
        });
        this.countErrors.Name.count = 0;
        this.countErrors.Name.correct = false;
      } else {
        let validation = this.state.errorsValidation;
        delete validation["Name"];
        this.setState({
          errorCount: this.state.errorCount - this.countErrors.Name.click,
          errorsValidation: { ...validation }
        });
        this.countErrors.Name.count = 0;
        this.countErrors.Name.click = 0;
        this.countErrors.Name.correct = true;
        this.customer["Name"] = text;
      }
    }
  }

  private validateAddress(text: string) {
    if (this.basketEmpty) {
      if ((text.length < 10) || text.length > 18) {
        ++this.countErrors.Address.count;
        ++this.countErrors.Address.click;
        this.setState({
          errorCount: this.state.errorCount + this.countErrors.Address.count,
          errorsValidation: {
            ...this.state.errorsValidation,
            Address: this.countErrors.Address.errMsg
          }
        });
        this.countErrors.Address.count = 0;
        this.countErrors.Address.correct = false;
      } else {
        let validation = this.state.errorsValidation;
        delete validation["Address"];
        this.setState({
          errorCount: this.state.errorCount - this.countErrors.Address.click,
          errorsValidation: { ...validation }
        });
        this.countErrors.Address.count = 0;
        this.countErrors.Address.click = 0;
        this.countErrors.Address.correct = true;
        this.customer["Address"] = text;
      }
    }
  }

  private validateEmail(email: string) {
    if (this.basketEmpty && email.length != 0) {
      if (email.match("^[^s@]+@[^s@]+.[^s@]+$") || email.length == 0) {
        let validation = this.state.errorsValidation;
        delete validation["Email"];
        this.setState({
          errorCount: this.state.errorCount - this.countErrors.Email.click,
          errorsValidation: { ...validation }
        });
        this.countErrors.Email.count = 0;
        this.countErrors.Email.click = 0;
        this.countErrors.Email.correct = true;
        this.customer["Email"] = email;
      } else {
        ++this.countErrors.Email.count;
        ++this.countErrors.Email.click;
        this.setState({
          errorCount: this.state.errorCount + this.countErrors.Email.count,
          errorsValidation: {
            ...this.state.errorsValidation,
            Email: this.countErrors.Email.errMsg
          }
        });
        this.countErrors.Email.count = 0;
        this.countErrors.Email.correct = false;
      }
    }
  }

  private validateCaptcha(answer: string) {
    if (this.basketEmpty && answer.length != 0) {
      let secretKey = "some-unique-key";
      let simpleCrypto = new SimpleCrypto(secretKey);
      let decipherText = simpleCrypto.decrypt(this.captcha, true);
      decipherText = decipherText[0].split("_")[0];
      if (decipherText == answer.toLowerCase() || answer.length == 0) {
        let validation = this.state.errorsValidation;
        delete validation["Captcha"];
        this.setState({
          errorCount: this.state.errorCount - this.countErrors.Captcha.click,
          errorsValidation: { ...validation }
        });
        this.countErrors.Captcha.count = 0;
        this.countErrors.Captcha.click = 0;
        this.countErrors.Captcha.correct = true;
      } else {
        ++this.countErrors.Captcha.count;
        ++this.countErrors.Captcha.click;
        this.setState({
          errorCount: this.state.errorCount + this.countErrors.Captcha.count,
          errorsValidation: {
            ...this.state.errorsValidation,
            Captcha: this.countErrors.Captcha.errMsg
          }
        });
        this.countErrors.Captcha.count = 0;
        this.countErrors.Captcha.correct = false;
      }
    }
  }

  private checkOrder(refresh: (o: {}) => {}) {
    if (this.basketEmpty && !this.state.errorCount) {
      let errors = {};
      Object.keys(this.countErrors).forEach((v: any) => {
        if (!this.countErrors[v]["correct"]) {
          errors[v] = this.countErrors[v]["errMsg"];
        }
      });

      if (Object.keys(errors).length) {
        this.setState({ errorsValidation: errors });
      } else {
        this.setState({ disableBtn: true });
        let items = [];
        let i = JSON.parse(localStorage.getItem("basket"));
        Object.keys(i).forEach((v: any) =>
          items.push({
            price: i[v].price,
            title: i[v].title,
            url: i[v].url,
            qty: i[v].qty ? v.qty : 1,
            time: Date.now()
          })
        );
        this.props.items
          .collection("orders")
          .add({
            customer: {
              Address: this.customer["Address"],
              Email: this.customer["Email"],
              Name: this.customer["Name"]
            },
            items: items
          })
          .then(docRef => {
            this.setState({ addFirebase: true, disableBtn: false });
            localStorage.setItem("basket", "0");
            refresh({
              countBasket: Object.keys(
                JSON.parse(localStorage.getItem("basket"))
              ).length,
              shake: "basket"
            });
          })
          .catch(error => {
            console.error("Error adding document: ", error);
            this.setState({ disableBtn: true });
          });
      }
    }
  }

  private btnOrder() {
    return (
      <Store.Consumer>
        {(v: any) => (
          <>
            <button
              disabled={this.state.disableBtn}
              onClick={e => {
                this.checkOrder(v.refresh);
              }}
              className="check_order"
            >
              ORDER
            </button>
          </>
        )}
      </Store.Consumer>
    );
  }

  private success() {
    return (
      <div className="errors no_errors">
        <p>Order Completed Successfully! Thank you!</p>
      </div>
    );
  }

  private showErrors() {
    const errors = Object.keys(this.state.errorsValidation).map((v: string) => {
      return (
        <p key={v}>
          - Field{" "}
          <strong>
            <u>{v}</u>
          </strong>
          :{this.state.errorsValidation[v]}
        </p>
      );
    });

    return (
      <div className="errors">
        <p>ERRORS:</p>
        {errors}
      </div>
    );
  }
}
