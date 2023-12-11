import React from 'react';
import Res from "../../../../../assets/Res";

export default function ToSelectItemView({tag, onClick}) {
    return (
        <div className="to-select-item" onClick={onClick}>
            <p className="to-select-item-title">{tag}</p>
            {Res.icon.add}
        </div>
    );
}
