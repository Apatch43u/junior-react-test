import React, {useEffect, useState} from 'react';
import CartItems from "./CartItems";
import axios from "axios";

const TotalCart = ({ setCartItems, currency = [], totalItems = [] }) => {
    //the number of items removed from the cart
    const [del, setDel] = useState(0)

    //the total of products in the cart
    const [total, setTotal] = useState(0);

    //totalQuantity of cart
    const [totalQuantity, setTotalQuantity] = useState(totalItems.length);

    //an array of products in the basket
    let haveTotal = 0;
    let totalArrayCart = [];

    //when the quantity changes, removes this item from the totalArray array and writes the item with the new amount in its place
    const setTotalArray = (price, id) => {
        totalArrayCart.map((obj) => {
            if (id === obj.id){
                totalArrayCart = totalArrayCart.filter(item => item.id !== id)
            }
        })
        totalArrayCart.push({id, price})
        haveTotal = 0;
        totalArrayCart.map((obj) => {
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
    }, [del])

    return (
        <div className="total-cart">
            <h1>Cart</h1><hr/>
            {totalItems.map((obj) => (
                <div>
                    <CartItems
                        setDel={setDel}
                        del={del}
                        totalQuantity={totalQuantity}
                        setTotalQuantity={setTotalQuantity}
                        setCartItems={setCartItems}
                        total={total}
                        setTotal={setTotal}
                        setTotalArray={setTotalArray}
                        totalArrayCart={totalArrayCart}
                        currency={currency}
                        items={obj}
                    />
                    <hr/>
                </div>
            ))}
            <div className="total-price">
                <div className="total-left">
                    <h3>Tax 21%: </h3>
                    <h3>Quantity: </h3>
                    <h3>Total: </h3>
                </div>
                <div className="total-right">
                    <b>{currency[0]}{(total * 0.21).toFixed(2)}</b>
                    <b>{totalQuantity}</b>
                    <b>{currency[0]}{(total + (total * 0.21)).toFixed(2)}</b>
                </div>
            </div>
            <button className="total-button">ORDER</button>
        </div>
    );
};

export default TotalCart;