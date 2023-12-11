import React from "react";
import Box from "../../../../base/refactored/box/Box";
import Link from "../../../../base/Link";
import post_image_dark from "../../../../../assets/images/post_image_dark.svg";
import post_image_light from "../../../../../assets/images/post_image_light.svg";
import "../../../blog/Blog.scss"

export default function HomePostView({post}) {
	let placeholder_image;
	switch (post.background_color.class_name) {
		case 'background':
		case 'background-light':
		case 'white-background':
			placeholder_image = post_image_dark;
			break;
		default:
			placeholder_image = post_image_light;

	}
	return (
		<Link to={`/blog/posts/${post.slug}/`} className={'box hidden-overflow'}>
			<div className={'home-blog-post-image-container'}>
				<img className={`home-blog-post-image ${post.background_color.class_name}`}
					 src={post.image ? post.image : placeholder_image}
					 alt={post.title}/>
			</div>
			<h4 className={'small center margin-two'}>{post.title}</h4>
		</Link>
	)
}
