import React from 'react';
import Res from "../../../../../assets/Res";


export default function SelectedItemView({tag, onClick}) {
    return (
        <div className="selected-item"
             onClick={onClick}>
            <p className="selected-item-title">{tag}</p>
            {Res.icon.cross}
        </div>
    );
}
