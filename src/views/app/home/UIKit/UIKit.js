import Box from "../../../base/refactored/box/Box";
import Body from "../../../base/Body";
import Row from "../../../base/Row";
import MasterColumn from "../../../base/MasterColumn";
import Res from "../../../../assets/Res";
import ButtonView from "../../../base/forms/button/ButtonView";
import {BUTTON_TYPE} from "../../../../stores/base/form/buttons/Button";
import React from "react";
import ScrollableColumn from "../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../base/refactored/scrollable/Scrollable";


function ColorsKit() {
	let colors = ["primary", "secondary", "success", "danger", "gray"];
	let styles = ["gradient", "dark", "default", "light", "background"];
	return (
		<Box>
			<Body>
				<h1 className={'center'}>رنگ ها</h1>
				<Row>
					{colors.map(color => (
						<MasterColumn key={color}>
							{styles.map(style => <Box key={style + color} className={`${color}-${style}-filled`}><Body>
								<p className={"center white"}>{color}<br/>{style}</p>
							</Body>
							</Box>)}
						</MasterColumn>
					))}
				</Row>
			</Body>
		</Box>
	)
}

function ButtonsKit() {
	let styles = ['raised', 'flat', 'bordered'];
	let sizes = ['default', 'large', 'small'];
	let colors = ['primary', 'secondary', 'success', 'danger', 'gray'];
	let params = [
		{title: 'مشاهده همه موارد', icon: Res.icon.cake},
		{title: 'مشاهده همه موارد', icon: Res.icon.cake, active: false},
		{title: 'مشاهده همه موارد', icon: Res.icon.cake, loading: true},
		{title: 'مشاهده همه موارد', icon: Res.icon.cake, about: 'بقیه موارد رو ببین'},
		{title: 'مشاهده همه موارد', icon: null},
		{title: 'مشاهده همه موارد', icon: null, active: false},
		{title: 'مشاهده همه موارد', icon: null, loading: true},
		{title: 'مشاهده همه موارد', icon: null, about: 'بقیه موارد رو ببین'},
		{title: null, icon: Res.icon.cake},
		{title: null, icon: Res.icon.cake, active: false},
		{title: null, icon: Res.icon.cake, loading: true},
		{title: null, icon: Res.icon.cake, about: 'بقیه موارد رو ببین'},
	];
	// let colors = ['primary'];
	// let styles = ['raised'];
	// let sizes = ['default'];
	// let params = [
	// 	{title: 'مشاهده همه موارد', icon: Res.icon.cake, loading: true},
	// ];
	return (<Box>
		<Body>
			<h1 className={'center'}>دکمه ها</h1>
			{
				styles.map(style =>
					<div key={style}>
						<h2 className={'center'}>{style}</h2>
						{sizes.map(size =>
							<div>
								<h3 className={'center'}>{style} - {size}</h3>
								{params.map((param, index) =>
									<div>
										<Row key={index + style + size}>{colors.map(color =>
											<ButtonView key={index + color + style + size}
														className={`${style} ${color} ${size}`}
														{...param}
														type={BUTTON_TYPE.FAKE}/>
										)}</Row>
									</div>
								)}</div>
						)}
					</div>
				)
			}
		</Body>
	</Box>)
}


function TypographyKit() {
	let colors = ['no-color', 'primary', 'secondary', 'success', 'danger'];
	let styles = ['no-style', 'small', 'bold', 'italic', 'center'];
	let paraf = 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز ابزارهای کاربردی می باشد. ';
	let parafEn = 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.';
	return (<Box>
		<Body>
			<h1 className={'center'}>متن ها - Typography</h1>
			<Row>
				<div className={'inline-half-row-responsive fa'}>
					<h1 className={'center'}>فارسی</h1>
					<h1>عنوان اصلی</h1>
					<p>{paraf}</p>
					<h2>عنوان ثانویه</h2>
					<p>{paraf}</p>
					<h3>موضوع مهم</h3>
					<p>{paraf}</p>
					<h4>موضوع جانبی</h4>
					<p>{paraf}</p>
					<h5>نکته</h5>
					<p>{paraf}</p>
					<h6>خصوصیت</h6>
					<p>{paraf}</p>
				</div>
				<div className={'inline-half-row-responsive en'}>
					<h1 className={'center'}>English</h1>
					<h1>Main Title</h1>
					<p>{parafEn}</p>
					<h2>Secondary Title</h2>
					<p>{parafEn}</p>
					<h3>Important Note</h3>
					<p>{parafEn}</p>
					<h4>Side Note</h4>
					<p>{parafEn}</p>
					<h5>Attention</h5>
					<p>{parafEn}</p>
					<h6>Property</h6>
					<p>{parafEn}</p>
				</div>
				{styles.map(style => {
						return (
							<div key={style} className={'inline-half-row-responsive padding-one'}>
								<h2 className={'center'}>{style}</h2>
								<h1 className={style}>عنوان اصلی</h1>
								<p className={style}>{paraf}</p>
								<h2 className={style}>عنوان ثانویه</h2>
								<p className={style}>{paraf}</p>
								<h3 className={style}>موضوع مهم</h3>
								<p className={style}>{paraf}</p>
								<h4 className={style}>موضوع جانبی</h4>
								<p className={style}>{paraf}</p>
								<h5 className={style}>نکته</h5>
								<p className={style}>{paraf}</p>
								<h6 className={style}>خصوصیت</h6>
								<p className={style}>{paraf}</p>
							</div>
						)
					}
				)
				}
			</Row>
		</Body>
	</Box>)
}

function UIKit() {
	return <ScrollableColumn>
		<Scrollable>
			<div className={'container padding-one-desktop'}>
				<ColorsKit/>
				<TypographyKit/>
				<ButtonsKit/>
			</div>
		</Scrollable>
	</ScrollableColumn>
}
