import React from 'react';

const Color = ({ id, setColor, color }) => {
    return (
        <div className="color-radio">
            <input type="radio" id={color+id} name={`color${id}`} value={color} onChange={e => setColor(e.target.value)}/>
            <label for={color+id} style={{background: `${color}`}}></label>
        </div>

    );
};

export default Color;