import {BUTTON_TYPE} from "../../../../stores/base/form/buttons/Button";

export const nlandingFa = {
	greenoly: 'گرینولی',
	header_intro: 'وبسایت هوشمند',
	usfull_links:'لینک های پر کاربرد',
	get_started_text: 'یک تـجربه متـفـاوت‌ ؛',
	get_started: 'شروع کنید',
	go_to_dashboard:'برو به داشبورد',
	register: 'ثبت نام',
	trusted_by_more: 'و صد ها شرکت دیگر...',
	get_started_freelancing:'شروع فریلنسینگ با گرینولی',
	achare: 'آچاره',
	alborz: 'بیمه البرز',
	alibaba: 'علی بابا',
	bama: 'بیمه باما',
	digi: 'دی جی لند',
	drdr: 'دکتر دکتر',
	kale: 'کاله',
	laico: 'لایکو',
	mazmaz: 'گروه صنعتی مزمز',
	mihan: 'گروه صنعتی میهن',
	moalem: 'بیمه معلم',
	safarmarket: 'سفر مارکت',
	taghche: 'طاقچه',
	telavang: 'تلاونگ',

	salary: {
		theme: 'dark accent ',
		reverse: false,
		image: 'salary_2',
		data: {
			title: 'محاسبه دستمزد',
			text: 'از دستمزد خودتان اطلاع ندارید؟ می خواهید دستمزد های متعارف را بدانید؟',
			cta: 'همین حالا امتحان کنید!',
			icon: 'landing_salary',
			link: '#salary',
			buttons: [
				{
					comming_soon: false,
					className: 'x-large raised success',
					title: 'خدمات محاسبه دستمزد',
					type: BUTTON_TYPE.LINK,
					link: '/funnel/salary/',
				},
			]
		},

	},

	
	school: {
		theme: 'dark secondary',
		reverse: true,
		image: 'school_1',
		data: {
			link: '/school',
			comming_soon: false,
			title: 'دوره های آموزشی',
			icon: 'landing_learning',
			text: 'آموزش گام به گام و مرتبط با کار را در گرینولی تجربه کنید.',
			cta: 'همین حالا شروع کنید!',
			buttons: [
				{
					className: 'large raised success',
					title: 'مشاهده دوره ها',
					type: BUTTON_TYPE.LINK,
					link: '/school/',
				},
			]
		}
	},
	law: {
		data: {title: 'خدمات حقوقی', icon: 'landing_law', comming_soon: true,buttons:[]}
	},
	test: {
		data: {title: 'آزمون آنلاین', icon: 'landing_test', comming_soon: true,buttons:[]}
	},


};
