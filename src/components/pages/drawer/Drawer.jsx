import React, {useEffect, useMemo, useState} from 'react';
import DrawerCart from "./DrawerCart";
import {Link} from "react-router-dom";
import axios from "axios";

const Drawer = ({ currency = [], setCartItems, openOverlay, items = [] }) => {
    //the total of products in the cart
    const [total, setTotal] = useState(0)

    //the number of items removed from the cart
    const [deleted, setDeleted] = useState(0)

    let haveTotal = 0;

    //an array of products in the basket
    let totalArray = []


    //when the quantity changes, removes this item from the totalArray array and writes the item with the new amount in its place
    const setTotalArray = (price, id) => {
        totalArray.map((obj) => {
            if (id === obj.id){
                totalArray = totalArray.filter(item => item.id !== id)
            }
        })
        totalArray.push({id, price})
        haveTotal = 0;
        totalArray.map((obj) => {
            haveTotal += obj.price;
        })
        setTotal(haveTotal)
    }
    //if the product was deleted, we get the data from the json server again
    useEffect(() => {
        axios.get('https://62ea52f0ad2954632589cc58.mockapi.io/cart')
            .then((res) => {
                setCartItems(res.data);
            });
    }, [deleted])
    return (
        <div className="overlay">
            <div className="drawer">
                { items.length === 0 ? (
                    <div className="empty-cart">
                        <img className="empty" width={100} height={100} src="/img/img-emoji-empty-cart.svg" alt="emoji-empty-cart"/>
                        <h1>Cart is empty</h1>
                        <button className="button-empty" onClick={openOverlay}>Go add)</button>
                    </div>
                ) : (
                    <div>
                        <div className="drawer-header">
                            <h1><b>My bag</b>, {items.length} items</h1>
                        </div>
                        {items.map((obj, key) => (
                            <DrawerCart
                                deleted={deleted}
                                setDeleted={setDeleted}
                                currency={currency}
                                key={key}
                                totalArray={totalArray}
                                setTotal={setTotal}
                                total={total}
                                sizes={obj.size}
                                setTotalArray={setTotalArray}
                                setCartItems={setCartItems}
                                items={obj}
                            />
                        ))}
                        <div className="drawer-total-row">
                            <p>Total:</p>
                            <p >{currency[0]}{total}.00</p>
                        </div>
                        <div className="drawer-total-button">
                            <button className="button-view-bag" onClick={openOverlay}>VIEW BACK</button>
                            <div onClick={openOverlay}>
                                <Link to="/cart">
                                    <button className="button-checkout">CHECK OUT</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Drawer;