import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Size from "../../Size";
import Color from "../../Color";

const DrawerCart = ({ deleted, setDeleted, currency = [], totalArray, setTotal, total, setTotalArray, setCartItems, items = [] }) => {
    //the number of products in the cart
    const [itemQuantity, setItemQuantity] = useState(1);

    //an array of card sizes and colors
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);

    //get colors and sizes from the object
    const siz = items.size.split(" ");
    const col = items.color.split(" ");

    //selected size with initial value, that is specified in the received Object
    const[size, setSize] = useState(items.sizeChoice);
    const[color, setColor] = useState(items.colorChoice);

    //sets the value of the selected size to the one specified in the received object if the number of goods in the card has changed, quantity of one card or cart has been deleted
    useEffect(() => {
        setColors(col);
        setSizes(siz);
        setSize(items.sizeChoice);
        setColor(items.colorChoice);
    }, [items.length, itemQuantity, deleted])

    //if the currency has changed, the quantity of goods and the total array of goods has changed
    useEffect(() => {
        setTotalArray(Math.ceil(items.price * currency[1]) * itemQuantity, items.id)
    }, [total, currency, itemQuantity, totalArray])

    //sends the selected color and size to the object when the color or size is changed
    useEffect(() => {
        axios.put(`https://62ea52f0ad2954632589cc58.mockapi.io/cart/${items.id}`, {sizeChoice: size}).then(() => console.log("put success"))
        axios.put(`https://62ea52f0ad2954632589cc58.mockapi.io/cart/${items.id}`, {colorChoice: color}).then(() => console.log("put success"))
    }, [size, color])

    //adding the number of products with a limit of 100 positions
    const incrementItemQQuantity = () => {
        if (itemQuantity < 100)
        {
            setItemQuantity(itemQuantity + 1);
        } else {
            alert("Contact the administration to make a wholesale purchase");
        }
    }

    //subtraction the number of products and if the quantity is less than 1, it calls the function to remove the product from the cart
    const decrementItemQQuantity = () => {
        if (itemQuantity > 1)
        {
            setItemQuantity(itemQuantity - 1);
        } else {
            onRemoveItem(items.id)
        }
    }

    //product removal function that sends a product removal request, recalculates the amount and adds the removed product with a delay of 400 milliseconds
    const onRemoveItem = (id) => {
        axios.delete(`https://62ea52f0ad2954632589cc58.mockapi.io/cart/${id}`).then(() => console.log('Delete successful'))
        setCartItems((prev) => prev.filter((item)=> item.id !== id));
        setTotal(total - Math.ceil(items.price * currency[1]));
        setTimeout(
            () => {
                setDeleted(deleted + 1);
            },
            400
        );
    }
    return (
        <ul className="drawer-cart">
            <li className="drawer-cart-left-part">
                <p>{items.title}</p>
                <b>{currency[0]}{Math.ceil(items.price*currency[1])},00</b>
                {/*<b>${totalOneCart},00</b>*/}
                <h2>Size: {size.toUpperCase()}</h2>
                <div className="btn-row">
                    {sizes.map((obj) => (
                        <Size
                            id={items.id}
                            setSize={setSize}
                            size={obj}
                        />
                    ))}
                </div>
                <h2>Color:</h2>
                <div className="btn-color">
                    {colors.map((obj) => (
                        <Color
                            id={items.id}
                            setColor={setColor}
                            color={obj}
                        />
                    ))}
                </div>
            </li>
            <li className="drawer-cart-quantity">
                <button onClick={incrementItemQQuantity}>+</button>
                <h1>{itemQuantity}</h1>
                <button onClick={decrementItemQQuantity}>-</button>
            </li>
            <li className="">
                <img width={140} height={191} src={items.imgURL[`${color}`]} alt="product-photo"/>
            </li>
        </ul>
    );
};

export default DrawerCart;