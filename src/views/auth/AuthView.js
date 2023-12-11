import React, { lazy, Suspense } from "react";
import "./Styles.scss";

import { Route, Switch, withRouter } from "react-router";
import LoadingView from "../base/refactored/loadingView/LoadingView";
import NotFoundPage from "../base/notFound/NotFoundPage";
import { connect } from "../../stores/base/StoreManager";
import StoreView from "../base/StoreView";
import TabsContainerView from "../base/tabView/TabsContainerView";
import ButtonView from "../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../stores/base/form/buttons/Button";
import Res from "../../assets/Res";
import Box from "../base/refactored/box/Box";
import Auth from "./stores/Auth";
