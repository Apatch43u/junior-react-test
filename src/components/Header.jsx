import React from 'react';
import {Link} from "react-router-dom";

const Header = ({ currency = [], setCurrency, items, setCategory, openOverlay }) => {
    return (
        <header>
            <div>
                <div className="underClothing">
                    <Link to="/women" style={{ textDecoration: 'none' }}>
                        <div className="category-radio">
                            <input type="radio" id="women" name="category"/>
                            <label htmlFor="women">
                                    <span onClick={() => setCategory("Women")}>WOMEN</span>
                            </label>
                        </div>
                    </Link>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <div className="category-radio">
                            <input type="radio" id="man" name="category"/>
                            <label htmlFor="man">
                                    <span onClick={() => setCategory("Man")}>MAN</span>
                            </label>
                        </div>
                    </Link>
                    <Link to="/kids" style={{ textDecoration: 'none' }}>
                        <div className="category-radio">
                            <input type="radio" id="kids" name="category"/>
                            <label htmlFor="kids">
                                    <span onClick={() => setCategory("Kids")}>KIDS</span>
                            </label>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="center-image">
                <Link to="/">
                    <img src="/img/img-a-logo.svg" alt="a-logo"/>
                </Link>
            </div>
            <div>
                <ul className="underCurrency">
                    <li>
                        <select className="user_currency" onChange={(e) => {
                            const selectedCurrency = [e.target.value[0], Number(e.target.value.slice(2, 10))];
                            setCurrency(selectedCurrency);
                        }}>
                            <option value={["$", 1]}>$ USD</option>
                            <option value={["€", 1.02]}>€ EUR</option>
                            <option value={["¥", 133.32]}>¥ JPY</option>
                        </select>
                    </li>
                    <li className="cart" onClick={openOverlay}>
                        <img src="/img/img-cart.svg" alt="cart"/>

                        {items.length !== 0 ? (
                            <h3>{items.length}</h3>
                        ) : (<p></p>)}
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;