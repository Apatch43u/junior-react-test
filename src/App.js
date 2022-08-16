import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Drawer from "./components/pages/drawer/Drawer";
import Cards from "./components/pages/cards/Cards";
import CardPage from "./components/pages/CardPage";
import {} from './components/context'
import {Context} from "./components/context";
import TotalCart from "./components/pages/cart/TotalCart";

function App() {
    //opening and closing the overlay
    const [drawerOpened, setDrawerOpened] = useState(false);

    //object of all cards
    const [items, setItems] = useState([]);

    //the object of all the cards of the cart
    const [cartItems, setCartItems] = useState([]);

    //data object cardPage
    const [cardPage, setCardPage] = useState([]);

    //category selection
    const [category, setCategory] = useState("Man");

    //currency selection
    const [currency, setCurrency] = useState(["$", 1]);

    //receiving cards, depending on the category
    useEffect(() => {
        axios.get(`https://62ea52f0ad2954632589cc58.mockapi.io/${category.toLowerCase()}`)
            .then((res) => {
                setItems(res.data);
            });

    }, [drawerOpened, category]);

    //the function of opening an overlay
    const openOverlay = () => {
        setDrawerOpened(!drawerOpened);
    }

    //the function of receiving basket cards
    const onAddToCart = (obj) => {
        axios.post('https://62ea52f0ad2954632589cc58.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, obj]);
    }

    //data transfer to the card page
    const createCardApp = (item) => {
        setCardPage(item)
    }

    return (
        <Context.Provider value={{
            createCardApp
        }}>
            <div className="app">
                {drawerOpened &&
                    <Drawer
                        currency={currency}
                        setCartItems={setCartItems}
                        openOverlay={openOverlay}
                        items={cartItems}
                    />}
                <Header
                    currency={currency}
                    setCurrency={setCurrency}
                    setCategory={setCategory}
                    openOverlay={openOverlay}
                    items={cartItems}
                />
                <Routes>
                    <Route path="/" element={
                        <Cards
                            currency={currency}
                            category={category}
                            onAddToCart={onAddToCart}
                            items={items}
                        />
                    }/>
                    <Route path={"/" + category} element={
                        <Cards
                            currency={currency}
                            category={category}
                            onAddToCart={onAddToCart}
                            items={items}
                        />
                    }/>
                    <Route path="/card" element={
                        <CardPage
                            currency={currency}
                            onAddToCart={onAddToCart}
                            id={cardPage[0]}
                            title={cardPage[1]}
                            price={cardPage[2]}
                            imgURL={cardPage[3]}
                            size={cardPage[4]}
                            color={cardPage[5]}
                            text={cardPage[6]}
                        />
                    }/>
                    <Route path="/cart" element={
                        <TotalCart
                            setCartItems={setCartItems}
                            currency={currency}
                            totalItems={cartItems}
                        />
                    }/>
                </Routes>
            </div>
        </Context.Provider>
    );
}

export default App;
