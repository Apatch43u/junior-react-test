import React, {useContext, useState, useEffect} from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import {Context} from '../../context'
const Card = ({ currency = [], text, id, title, price, imgURL, size, color, cardStatus, onAddToCart}) => {
    //Boolean type that stores the Boolean type of adding the product to the cart
    const [isAdded, setIsAdded] = React.useState(false)

    //calls the function that passes the object to open the CARD PAGE
    const {createCardApp} = useContext(Context)

    //an array to store all card colors
    const [colors, setColors] = useState([]);

    //extracts the colors and sizes of the card from the object
    const col = color.split(" ");
    const siz = size.split(" ");

    //when loading the page, transfers all colors of the card to the colors array
    useEffect(() => {
        setColors(col)
    }, [])

    //Tracks cart requests and transfers information to a json file
    const onClickCart = () => {
        setIsAdded(!isAdded);
        if (!isAdded){
            onAddToCart( { id, title, price, imgURL, size, color, sizeChoice: siz[0], colorChoice: colors[0], text } );
            axios.put(`https://62ea52f0ad2954632589cc58.mockapi.io/product/${id}`, {cardStatus: false}).then(() => console.log("put success"))
        } else {
            axios.put(`https://62ea52f0ad2954632589cc58.mockapi.io/product/${id}`, {cardStatus: true}).then(() => console.log("put success"))
        }
    }
    return (
        <div className={cardStatus ? ("cart-dont-have") : ("cart-have")}>
            <Link to="/card">
                <img width={354} height={400} src={imgURL[`${colors[0]}`]} alt="product-a" onClick={() => createCardApp([id, title, price, imgURL, size, color, text])}/>
            </Link>
            <img className="cart-add" src={
                isAdded
                    ? "/img/btn-tick.svg"
                    : "/img/img-green-cart.svg"
            } alt="green-cart" onClick={onClickCart} />
            <h3>{title}</h3>
            <b>{currency[0]}{Math.ceil(price*currency[1])},00</b>
        </div>
    );
};

export default Card;