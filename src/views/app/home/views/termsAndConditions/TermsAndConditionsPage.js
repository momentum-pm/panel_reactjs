import React from "react";
import Res from "../../../../../assets/Res";
import StepView from "../../../../base/forms/fields/stepView/StepView";
import "./TermsAndConditions.scss";
import ScrollableColumn from "../../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../../base/refactored/scrollable/Scrollable";
import FooterView from "../footerView/FooterView";

export default function TermsAndConditionsPage() {
	return (
		<ScrollableColumn>
			<Scrollable>
				<div className={'terms-and-conditions'}>
					<h2 className={'terms-and-conditions-title'}>{Res.string.home.terms_and_conditions.title}</h2>
					<p className={'terms-and-conditions-text'}>{Res.string.home.terms_and_conditions.text}</p>
					<ul>
						{Res.string.home.terms_and_conditions.items.map((item, index) => {
							return (
								<li key={index} className={'terms-and-conditions-item'}>
									<StepView index={index + 1} label={item.title}/>
									<p className={'terms-and-conditions-item-text'}>{item.text}</p>
								</li>
							)
						})}
					</ul>
				</div>
				<FooterView/>
			</Scrollable>
		</ScrollableColumn>
	)
}
