import PaginatedRemoteStorePage from "../../../base/PaginatedRemoteStorePage";
import Courses from "../stores/Courses";
import { connect } from "../../../../stores/base/StoreManager";
import SchoolCourseView from "./SchoolCourseView";
import { withRouter } from "react-router";
import React from "react";
import MasterColumn from "../../../base/MasterColumn";
import SchoolFilterFormView from "./SchoolFilterFormView";
import PaginatedRemoteStoreView from "../../../base/PaginatedRemoteStoreView";

class SchoolHomePage extends PaginatedRemoteStoreView {
  static getRemoteStore(props) {
    return Courses.map();
  }

  // getHeaderView() {
  // 	return (<h3 className={'small margin-two'}>دوره های آموزشی گرینولی</h3>)
  // }

  getFilterForm() {
    return <SchoolFilterFormView />;
  }
  getFilterFormView() {
    return null;
  }
  getPinnedView() {
    return this.getFilterForm();
  }
  getListView() {
    return <ol className={"row"}>{this.getData().map(this.mapItemToView)}</ol>;
  }

  mapItemToView(item, index) {
    return (
      <MasterColumn className={"three-columns"} key={item.id}>
        {" "}
        <SchoolCourseView course={item} />
      </MasterColumn>
    );
  }
}

export default withRouter(connect(SchoolHomePage));
// let code = "MzZYZ0kk";
// function getCandle() {
// 	let values = document.getElementsByClassName(`valuesAdditionalWrapper-${code}`)[0];
// 	let titleElements = values.getElementsByClassName(`valueTitle-${code}`);
// 	let valueElements = values.getElementsByClassName(`valueValue-${code}`);
//
// 	let candle = {};
// 	for (let i = 0; i < titleElements.length; i++) {
// 		let title = titleElements[i].innerHTML;
// 		if (title) {
// 			candle[title] = parseFloat(valueElements[i].innerHTML);
//
// 		}
// 	}
// 	return candle;
// }
//
// function candleEqual(c1, c2) {
// 	if (c1 && c2) {
// 		return (c1.O === c2.O) && (c1.C === c2.C) && (c1.H === c2.H) && (c1.L === c2.L) && (c1.Vol === c2.Vol);
// 	} else {
// 		return false;
// 	}
// }
//
//
// let a = document.getElementsByClassName("chart-gui-wrapper")[0];
// let allCandles = [];
// let candles = [];
// let shouldRecord = false;
// a.onmousemove = () => {
// 	if (shouldRecord) {
// 		let newCandle = getCandle();
// 		let currentCandle = candles.length > 0 ? candles[candles.length - 1] : null;
// 		let lastCandle = candles.length > 1 ? candles[candles.length - 2] : null;
// 		if (candleEqual(newCandle, currentCandle)) {
// 		} else if (candleEqual(newCandle, lastCandle)) {
// 			candles = candles.filter(candle => !candleEqual(currentCandle, candle))
// 		} else {
// 			candles.push(newCandle);
// 		}
// 	}
//
// };
// a.onclick = () => {
// 	shouldRecord = !shouldRecord;
// 	allCandles = [...allCandles, ...candles];
// 	candles = [];
// };
//
// function download(content, fileName, contentType) {
// 	var a = document.createElement("a");
// 	var file = new Blob([content], {type: contentType});
// 	a.href = URL.createObjectURL(file);
// 	a.download = fileName;
// 	a.click();
// }
//
// function save() {
// 	let str = JSON.stringify(allCandles);
// 	download(str, 'json.txt', 'text/plain');
// }
