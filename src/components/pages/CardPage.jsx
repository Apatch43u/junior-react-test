import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"

const CardPage = ({ currency = [], onAddToCart, imgURL, id, title, price, size, color, text, }) => {
    //an array of all card sizes
    const [sizes, setSizes] = useState([]);

    //selected size
    const[sizeChoice, setSize] = useState();

    //an array of all card colors
    const [colors, setColors] = useState([]);

    //selected color
    const[colorChoice, setColor] = useState();

    //when loading the page, I will set the value of the selected color and size that was received from the json server
    useEffect(() => {
        if (title){
            const siz = size.split(" ");
            const col = color.split(" ");
            setColors(col)
            setSizes(siz);
            setColor(col[0]);
            setSize(siz[0]);
        }
    }, [])

    //a function that transfers object data from the card page to the cart
    const onClickAdd = () => {
        onAddToCart( { id, title, price, imgURL, size, color, sizeChoice, colorChoice, text } );
    }

    if (!title) {
        return (
            <div className="reload-card-page">
                <img className="emoji-image" height={150} width={150} src="/img/img-sad-emoji.svg" />
                <h1>Please, return to the main page!</h1>
                <Link to="/">
                    <button>Main page</button>
                </Link>
            </div>
        );
    } else {
        return (
            <div className="card-page">
                <div className="image-total">
                    {Object.keys(imgURL).map((obj, i) => (
                        <img key={i} height={80} width={70} src={imgURL[obj]} alt="image-left-size" onClick={() => setColor(obj)}/>
                    ))}
                </div>
                <img className="image-main" height={611} width={610} src={imgURL[`${colorChoice}`]} alt="main-image"/>
                <div className="right-block">
                    <h1>{title}</h1>
                    <h3>Size:</h3>
                    <div className="btn-of-sizes">
                        {sizes.map((obj) => (
                            <div className="size-radio">
                                <input type="radio" id={obj} name={"size"} value={obj} onChange={e => setSize(e.target.value)}/>
                                <label htmlFor={obj}><span>{obj.toUpperCase()}</span></label>
                            </div>
                        ))}
                    </div>
                    <h3>Color:</h3>
                    <div className="btn-of-color">
                        {colors.map((obj) => (
                            <div className="color-radio">
                                <input type="radio" id={obj} name={`color`} value={obj} onChange={e => setColor(e.target.value)}/>
                                <label htmlFor={obj} style={{background: `${obj}`}}></label>
                            </div>
                        ))}
                    </div>
                    <h3>Price:</h3>
                    <b>{currency[0]}{Math.ceil(price*currency[1])},00</b><br></br>
                    <button onClick={onClickAdd}>ADD TO CART</button>
                    <p>{text}</p>
                </div>
            </div>
        )
    }
};

export default CardPage;