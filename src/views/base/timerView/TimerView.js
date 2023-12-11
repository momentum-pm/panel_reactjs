import React from "react";
import {normalizeNumber} from "../../../utils/StringUtils";
import "./TimerView.scss";
import Res from "../../../assets/Res";
import Row from "../Row";

export default function TimerView({timer, className, title}) {
	let h = timer.h;
	if (h < 10) {
		h = `0${h.toString()}`;
	}
	let m = timer.m;
	if (m < 10) {
		m = `0${m.toString()}`;
	}
	let s = timer.s;
	if (s < 10) {
		s = `0${s.toString()}`;
	}

	return (<div className={`timer ${className ? className : ''}`}>
			<Row className="timer-data centered">
				<div className="timer-part">
					<p className="timer-part-data">{normalizeNumber(s)}</p>
					<p className="timer-part-title">{Res.string.seconds}</p>
				</div>
				<p className="timer-split">:</p>
				<div className="timer-part">
					<p className="timer-part-data">{normalizeNumber(m)}</p>
					<p className="timer-part-title">{Res.string.minutes}</p>
				</div>
				<p className="timer-split">:</p>
				<div className="timer-part">
					<p className="timer-part-data">{normalizeNumber(h)}</p>
					<p className="timer-part-title">{Res.string.hours}</p>
				</div>
				<p className="timer-split">:</p>
				<div className="timer-part">
					<p className="timer-part-data">{normalizeNumber(timer.d)}</p>
					<p className="timer-part-title">{Res.string.days}</p>
				</div>
			</Row>
			<h4 className={`center timer-title`}>{title}</h4>
		</div>
	);
}
