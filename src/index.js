import * as serviceWorker from "./serviceWorker";
import React from "react";
import ReactDOM from "react-dom";
import AppManager from "./AppManager";

ReactDOM.render(<AppManager />, document.getElementById("root"));
serviceWorker.unregister();
