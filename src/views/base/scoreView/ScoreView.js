import React from "react";
import "./ScoreView.scss";

export default function ScoreView({maxScore, score, className = '', hasNullIndex = false}) {

	function getStepIndexes() {
		let indexes = [];
		let beginIndex;
		if (hasNullIndex) {
			beginIndex = -1;
		} else {
			beginIndex = 0;
		}
		for (let i = beginIndex; i < maxScore; i++) {
			indexes.push(i);
		}
		return indexes;
	}

	function getStepView(index) {
		let filled = index <= score;
		let hidden = (index === -1);
		return <div key={index}
					className={`score-view-step ${filled ? 'score-view-step-filled' : ''} ${hidden ? 'score-view-step-hidden' : ''}`}/>;
	}

	return (
		<div className={`score-view-content ${className}`}>
			{getStepIndexes().map(index => getStepView(index))}
		</div>
	)


}
