import React from "react";
import CentralStore from './hoc/CentralStore';
import Home from "./Home";
import Category from "./Category";
import Item from "./Item";
import Error404 from "./error/404";
import { Route, Switch, Redirect } from 'react-router-dom'
import firebaseDB from '../firebase';
import Basket from '../classes/Basket';
import BasketPage from '../components/BasketPage';
import WishListPage from '../components/WishListPage';
import OrderPage from '../components/OrderPage';
import SearchPage from '../components/SearchPage';
import WishList from '../classes/WishList';
import myMiddlewareFactory from "../middleware/myMiddleware";
import Currency from "../classes/Currency";

myMiddlewareFactory([Currency.checkCurrency, Basket.checkBasket, WishList.checkBasket]);

export default function Project() {
  return (
    <>
      <CentralStore>
        <Switch>
          <Route exact path='/' render={() => <Home items={firebaseDB} />} />
          <Route exact path='/category/:category/:page' render={(props: any) => <Category items={firebaseDB} {...props.match.params} />} />}/>
          <Route exact path='/category/:category' render={(props: any) => <Category items={firebaseDB} {...props.match.params} />} />}/>
          <Route exact path='/item/:title' render={(props: any) => <Item items={firebaseDB} {...props.match.params} />} />}/>
          <Route path='/basket' render={() => <BasketPage items={firebaseDB} />} />
          <Route path='/wishlist' render={() => <WishListPage items={firebaseDB} />} />
          <Route path='/order' render={() => <OrderPage items={firebaseDB} />} />
          <Route path='/search' render={() => <SearchPage items={firebaseDB} />} />
          <Route path='/404' component={Error404} />
          <Redirect to='/404' />
        </Switch>
      </CentralStore>
    </>
  );
}