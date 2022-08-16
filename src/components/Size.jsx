import React, {useState}  from 'react';

const Size = ({ id, setSize, size }) => {
    return (
        <div className="size-radio">
                <input type="radio" id={size + id} name={`size${id}`} value={size} onChange={e => setSize(e.target.value)}/>
                <label for={size + id}><span>{size.toUpperCase()}</span></label>
        </div>
    );
};

export default Size;