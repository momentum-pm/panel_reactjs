import { connect } from "../../../../../../stores/base/StoreManager";
import Res from "../../../../../../assets/Res";
import React from "react";
import KnowledgeView from "./KnowledgeView";
import BoxListRemoteStoreView from "../../../../../base/BoxListRemoteStoreView";
import KnowledgeSet from "../../../stores/knowledges/KnowledgeSet";
import Header from "../../../../../base/refactored/header/Header";

export default class KnowledgeSetView extends React.Component {
  render() {
    return (
      <ol className={`row padding-one-sides no-style`}>
        {this.props.knowledge_set.map((item, index) => (
          <KnowledgeView knowledge={item} key={index} />
        ))}
      </ol>
    );
  }
}
