import React from "react";
import "./HintBox.scss";
import Row from "../Row";

export default function HintBox({title, children, className}) {
	return (
		<div className={`hint-box ${className || ''}`}>
			<p className={'small'}>{title}</p>
			<ul>
				{Array.isArray(children) ? children.map((item, index) => <li key={index}>
						<Row className={''}>
							<div className={'hint-circle'}/>
							<div className={'main-flex'}>
								{item}
							</div>
						</Row>
					</li>) :
					<li>
						<Row className={''}>
							<div className={'hint-circle'}/>
							<div className={'main-flex'}>
								{children}
							</div>
						</Row>
					</li>
				}
			</ul>
		</div>
	);
}
