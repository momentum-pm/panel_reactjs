import {Helmet} from "react-helmet";
import React from "react";
import StoreView from "./StoreView";
import {connect} from "../../stores/base/StoreManager";
import MetaTags from "../../stores/base/MetaTags";

class MetaTagsHelmet extends StoreView {
	static mapPropsToStores() {
		return {meta_tags: MetaTags.map()}
	}

	render() {
		return (
			<Helmet>
				<title>{this.props.meta_tags.state.title}</title>
				<meta property="og:title" content={this.props.meta_tags.state.title}/>
				<meta name="keywords" content={this.props.meta_tags.state.keywords}/>
				<meta itemProp="keywords" content={this.props.meta_tags.state.keywords}/>
				<meta property="og:keywords" content={this.props.meta_tags.state.keywords}/>
				<meta name="image" content={this.props.meta_tags.state.image}/>
				<meta itemProp="image" content={this.props.meta_tags.state.image}/>
				<meta property="og:image" content={this.props.meta_tags.state.image}/>
				<meta property="og:secure_url" content={this.props.meta_tags.state.image}/>
				<meta property="twitter:image" content={this.props.meta_tags.state.image}/>
				<meta name="description" content={this.props.meta_tags.state.description}/>
				<meta itemProp="description" content={this.props.meta_tags.state.description}/>
				<meta property="og:description" content={this.props.meta_tags.state.description}/>
				<meta property="twitter:description" content={this.props.meta_tags.state.description}/>
			</Helmet>
		);
	}

}

export default connect(MetaTagsHelmet);
