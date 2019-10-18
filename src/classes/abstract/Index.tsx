import React from "react";
import { Redirect } from "react-router-dom";
import { Store } from "../../components/hoc/CentralStore";
import SpecialItems from "../../components/goods/SpecialItems";
import Logo from "../../components/logo/Logo";
import MobileLogo from "../../components/logo/MobileLogo";
import BarMenu from "../../components/menu/BarMenu";
import CategoryTitle from "../../components/menu/CategoryTitle";
import SideMenu from "../../components/menu/SideMenu";
import Search from "../../components/search/Search";
import Footer from "../../components/tpl/Footer";
import Header from "../../components/tpl/Header";
import SearchPreloader from "../../components/UI/preloaders/searchPreloader";
import SpecialPreloader from "../../components/UI/preloaders/specialPreloader";
import Currency from "../Currency";

interface IProps {
  items: firebase.firestore.Firestore;
  category?: string;
  page?: number;
}

interface IState {
  goods: string[];
  category?: string;
  redirect?: boolean;
}

self.trigger = false;

export default abstract class Index extends React.PureComponent<IProps,IState> 
{
  abstract blocks(): any;

  constructor(
    props: IProps,
    public count: number,
    public state: any,
    public className: string,
    public items: firebase.firestore.Firestore,
    public size: number,
    public perPage: number
  ) {
    super(props);
    this.state = { goods: null, redirect: false };
    this.className = Object.create(this).constructor.name;
  }

  render() {
    return (
      <Store.Consumer>
        {(value: any) => (
          <>
            {this.state.redirect ? <Redirect to="/404" /> : null}
            <Header changeValue={value.updateCurrency} />
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
                <CategoryTitle />
                <BarMenu />
                <Currency />
                <div className="application__content">
                  <nav className="menu_side" style={{ marginBottom: 152 }}>
                    <SideMenu />
                    {this.className === "Home" ? (
                      this.state.goods ? (
                        <SpecialItems goods={this.state.goods} />
                      ) : (
                        <SpecialPreloader />
                      )
                    ) : null}
                  </nav>
                  <main>
                    {value.searchTape ? <SearchPreloader /> : this.blocks()}
                  </main>
                </div>
              </div>
              <Footer />
            </div>
          </>
        )}
      </Store.Consumer>
    );
  }
}
