import React from "react";
import notFoundImage from "../../../assets/images/404.svg";
import Res from "../../../assets/Res";
import "./ForbiddenView.scss";
import ButtonView from "../forms/button/ButtonView";
import {BUTTON_TYPE} from "../../../stores/base/form/buttons/Button";

export default function ForbiddenView() {
    return (
        <div>
            <img className="not-found-image" src={notFoundImage} alt="Not Found"/>
            <p className="center text">{Res.string.forbidden}</p>
            <ButtonView
				type={BUTTON_TYPE.LINK}
                link={'/dashboard/'}
                title={Res.string.go_to_home}
                icon={Res.icon.nextArrow}
                className={'raised primary'}/>
        </div>
    );
}
