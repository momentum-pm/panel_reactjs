import React from "react";
import "./HomeConvertView.scss";
import Row from "../../../../base/Row";
import MasterColumn from "../../../../base/MasterColumn";
import Res from "../../../../../assets/Res";
import ButtonView from "../../../../base/forms/button/ButtonView";
import {BUTTON_TYPE} from "../../../../../stores/base/form/buttons/Button";


export default function HomeConvertAction({item, className}) {
	return (
		<div className={`home-convert home-convert-${className}`}>
			<div className={'container'}>
				<Row className={'centered'}>
					<MasterColumn className={'home-convert-image-container'}>
						<img src={item.image} className={'home-convert-image'}
							 alt={item.title}/>
					</MasterColumn>
					<MasterColumn className={'padding-two home-convert-content'}>
						<h2 className={'home-convert-title'}>{item.title}</h2>
						<ul className={'home-convert-list'}>
							{item.items.map((item, index) =>
								<li className={'home-convert-item'} key={index}>{item}</li>
							)}
						</ul>
						{item.link ? <Row>
								<ButtonView link={item.link}
											type={BUTTON_TYPE.LINK}
											icon={Res.icon.nextArrow}
											title={item.button}
											className={'large raised primary'}/>
							</Row>
							: null}
						{item.article ? <a href={item.article}
										   target={'_blank'}
										   rel={'noopener noreferrer'} className={'home-convert-hyperlink'}>{item.article_title}</a> : null}
					</MasterColumn>
				</Row>
			</div>
		</div>
	)
}
