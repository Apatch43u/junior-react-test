import React, {useState, useEffect} from 'react';
import Size from "../../Size";
import axios from "axios";
import Color from "../../Color";

const CartItems = ({ del, setDel, totalQuantity, setTotalQuantity, setCartItems, setTotal, total, setTotalArray, totalArrayCart, currency = [], items= [] }) => {
    //the number of products in the cart
    const [itemQuantity, setItemQuantity] = useState(1);

    //an array of card sizes and colors
    const [sizesCard, setSizesCard] = useState([]);
    const [colorCard, setColorsCard] = useState([]);

    //selected size with initial value, that is specified in the received Object
    const[size, setSize] = useState(items.sizeChoice);
    const[color, setColor] = useState(items.colorChoice);

    //sets the value of the selected size to the one specified in the received object if length of items or cart has been deleted
    useEffect(() => {
        setColorsCard(col);
        setSizesCard(siz);
        setSize(items.sizeChoice);
        setColor(items.colorChoice);
    }, [items.length, del]);

    //if the currency has changed, the quantity of goods and the total array of goods has changed
    useEffect(() => {
        setTotalArray(Math.ceil(items.price * currency[1]) * itemQuantity, items.id)
    }, [total, currency, itemQuantity, totalArrayCart]);

    //sends the selected color and size to the object when the color or size is changed
    useEffect(() => {
        axios.put(`https://62ea52f0ad2954632589cc58.mockapi.io/cart/${items.id}`, {sizeChoice: size}).then(() => console.log("put success"))
        axios.put(`https://62ea52f0ad2954632589cc58.mockapi.io/cart/${items.id}`, {colorChoice: color}).then(() => console.log("put success"))
    }, [size, color]);

    //get colors and sizes from the object
    const siz = items.size.split(" ");
    const col = items.color.split(" ");

    //adding the number of products with a limit of 100 positions and change totalQuantity
    const incrementItemQQuantity = () => {
        if (itemQuantity < 100)
        {
            setTotalQuantity(totalQuantity + 1);
            setItemQuantity(itemQuantity + 1);
        } else {
            alert("Contact the administration to make a wholesale purchase");
        }
    }

    //subtraction the number of products and if the quantity is less than 1, it calls the function to remove the product from the cart and change totalQuantity
    const decrementItemQQuantity = () => {
        if (itemQuantity > 1)
        {
            setTotalQuantity(totalQuantity - 1);
            setItemQuantity(itemQuantity - 1);
        } else {
            onRemoveCartItem(items.id);
        }
    }

    //product removal function that sends a product removal request, recalculates the amount and adds the removed product
    const onRemoveCartItem = (id) => {
        axios.delete(`https://62ea52f0ad2954632589cc58.mockapi.io/cart/${id}`).then(() => console.log('Delete cart item is successful'))
        setCartItems((prev) => prev.filter((item)=> item.id !== id));
        setTotalQuantity(totalQuantity - 1);
        setTotal(total - Math.ceil(items.price * currency[1]))
        setDel(del+1);
    }
    return (
        <div className="card-term">
            <div className="card-inf">
                <p>{items.title}</p>
                <b>{currency[0]}{Math.ceil(items.price*currency[1])},00</b>
                <h2>Size: {size.toUpperCase()}</h2>
                <div className="btn-row">
                    {sizesCard.map((obj) => (
                        <Size
                            id={items.id}
                            setSize={setSize}
                            size={obj}
                        />
                    ))}
                </div>
                <h2>Color:</h2>
                <div className="btn-color">
                    {colorCard.map((obj) => (
                        <Color
                            id={items.id}
                            setColor={setColor}
                            color={obj}
                        />
                    ))}
                </div>
            </div>
            <div className="card-quantity-img">
                <div className="card-quantity">
                    <button onClick={incrementItemQQuantity}>+</button>
                    <h1>{itemQuantity}</h1>
                    <button onClick={decrementItemQQuantity}>-</button>
                </div>
                <div className="card-img">
                    <img width={200} height={250} src={items.imgURL[`${color}`]} alt="product-photo"/>
                </div>
            </div>
        </div>
    );
};

export default CartItems;