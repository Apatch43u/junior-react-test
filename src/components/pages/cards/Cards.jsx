import React from 'react';
import Card from "./Card";

const Cards = ({ currency=[], category, onAddToCart, items = [] }) => {
    return (
        <div className="under-header-block">
            <div className="search-block">
                <h1>{category}'s clothing</h1>
                {/*<input placeholder="Search.."/>*/}
            </div>
            <div className="cart-total">
                {items.map((item) => (
                    <Card
                        currency={currency}
                        onAddToCart={onAddToCart}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
};

export default Cards;