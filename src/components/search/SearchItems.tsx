import React from "react";
import { HashLink as Link } from 'react-router-hash-link';
import Currency from '../../classes/Currency';
import { decodeHTML } from 'entities';
import BtnBasket from '../UI/buttons/BtnBasket';
import BtnWishList from '../UI/buttons/BtnWishList';

export default React.memo((props: any) => {
    if (sessionStorage.getItem('search') || props.search) {

        let i = sessionStorage.getItem('search')
            ? JSON.parse(sessionStorage.getItem('search'))
            : props.search;

        let items = i.map((val: any, k: number) => {
            return (
                <section className="latest_wrapper category_items" key={val[0]['id']}>
                    {
                        val.map((v: any, k: number) => {
                            val[k].img_medium = val[k].img_medium.replace(/public/gi, '');
                            return (
                                <article className="latest__item" key={v.id} style={{ borderTop: 0, borderBottom: 'rgba(0,0,0, 0.27) thin solid' }}>
                                    <div className="latest__item__img" style={{ background: `url(${v.img_medium}) no-repeat`, backgroundSize: 'contain', backgroundPosition: 'center' }}></div>
                                    <div className="item__price"> {Currency.currencyPrice(v.price)} </div>
                                    <Link to={'/item/' + v.url}>
                                        <div className="latest__item__desc">{decodeHTML(v.title)}</div>
                                    </Link>
                                    <form method="POST" onSubmit={(e: React.FormEvent) => e.preventDefault()}>
                                        <BtnBasket params={{ ...v }} id={v.id} />
                                        <BtnWishList params={{ ...v }} id={v.id} />
                                    </form>
                                </article>)
                        }
                        )}
                </section>);
        });
        return (
            <>
                {items}
                <section className="latest_wrapper bestsellers_wraper latest_featured" style={{ display: 'block', marginBottom: 330 }}>
                </section>
                {sessionStorage.removeItem('search')}
            </>
        );
    }
    else { return (<p className="count">Search Results: <span>0 </span>items</p>) }

})