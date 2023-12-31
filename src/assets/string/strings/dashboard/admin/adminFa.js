import {normalizeNumber} from "../../../../../utils/StringUtils";

export const adminFa = {
	phone_number_find_submit: 'جستجو با شماره',
	email_find_submit: 'جستجو با ایمیل',
	name_find_submit: 'جستجو با نام',
	username_find_submit: 'جستجو با نام کاربری',
	organization_find_submit: 'جستجو با شرکت',
	phone_number_find_placeholder: 'شماره موبایل...',
	email_find_placeholder: 'ایمیل...',
	name_find_placeholder: 'نام...',
	username_find_placeholder: 'نام کاربری...',
	organization_find_placeholder: 'نام شرکت...',
	max_count: 'تعداد',
	max_count_placeholder: 'حداکثر...',

	block_validation_hint: 'برای بلاک کردن کاربر، کلمه block رو در فیلد بالا وارد کنید.',
	block_validation_title: 'بلاک کردن کاربر',
	block_validation_placeholder: 'بنویس...',
	block_validation_error: 'تایپ کن block',
	user_profile_title: 'پروفایل شخصی',
	organization_profiles_title: 'پروفایل های شرکتی',

	users: 'کاربر ها',
	works: 'آگهی ها',
	tickets: 'تیکت ها',
	conversations: 'مکالمات',
	open_works: 'آگهی های فعال',
	profiles: 'پروفایل ها',
	shortener: 'لینک ساز',


	shortener_placeholder: 'لینک...',
	shortener_submit: 'کوتاه سازی',

	filters_title: 'فیلتر ها',
	submit_filters: 'اعمال فیلتر ها',
	close_ticket: 'بستن تیکت',
	conversations_filters: {
		new_conversation: 'چت جدید',
		new_message: 'پیام جدید',
		has_blocked: 'دارای پیام بلاک شده',
		has_suspicious: 'دارای پیام مشکوک',

	},
	suspicious: 'مشکوک',
	blocked: 'بلاک شده',
	safe: 'انتشار',
	block: 'بلاک کردن',
	last_update: 'آخرین آپدیت',
	message_count: 'تعداد پیام ها',

	unknown_province: 'استان نامشخص',
	provinces_placeholder: 'نام استان...',
	mode_label: 'نوع کاربری',
	active_only: 'فقط پروفایل های فعال',
	query_placeholder: 'نام، ایمیل، شماره تماس،...',
	my_tickets_only: 'فقط تیکت های من',
	has_phone_number: 'دارای شماره تماس',
	date_joined_lte_label: 'ثبت نام قبل از',
	date_joined_gte_label: 'ثبت نام بعد از',
	last_login_lte_label: 'آخرین ورود قبل از',
	last_login_gte_label: 'آخرین ورود بعد از',
	mode_title_short: {
		client: 'کارفرما',
		seeker: 'کارجو',
		dual: 'دوگانه',
		school: 'دانشجو',
		unset: 'نامشخص',
	},
	works_label: 'وضعیت درج آگهی',
	works_title: {
		yes: 'بله',
		no: 'خیر',
	},
	courses_label: 'وضعیت خرید دوره',
	courses_title: {
		yes: 'بله',
		no: 'خیر',
	},
	invoices_label: 'وضعیت فاکتور ها',
	invoices_title: {
		yes: 'بله',
		no: 'خیر',
	},
	type_title_short: {
		user: 'شخصی',
		organization: 'شرکتی',
	},
	profile_state_label: 'وضعیت پروفایل',
	profile_state_titles: {
		empty: 'خالی',
		weak: 'ضعیف',
		normal: 'متوسط',
		good: 'خوب',
		perfect: 'کامل'
	},
	profile_type_titles: {
		user: 'شخصی',
		organization: 'شرکتی',
	},

	profile_type_label: 'نوع پروفایل',
	last_promotion: 'آخرین پیام قبل از',
	last_login_min: 'آخرین ورود بعد از',
	last_login: 'آخرین ورود',
	date_joined: 'زمان ثبت نام',
	last_promo: 'آخرین پیام',
	last_login_max: 'آخرین ورود قبل از',
	no_promotions: 'هیچوقت',
	no_login: 'هیچوقت',
	send_email: 'ارسال ایمیل',
	send_k_email: (k) => `ارسال ${normalizeNumber(k)} ایمیل`,
	stop_sending: 'توقف ارسال',
	resume_sending: 'ادامه ارسال',

	invoice_count: 'فاکتور ها',
	course_count: 'دوره ها',
	profile: 'پروفایل',
	ongoingProjects: 'پروژه های فعال',
	accounting: 'مالی',
	notifications: 'پیام ها',


	categories: 'دسته بندی ها',
	title_fa: 'عنوان فارسی',
	title_fa_placeholder: 'عنوان فارسی...',
	title_en: 'عنوان انگلیسی',
	title_en_placeholder: 'عنوان انگلیسی...',
	order: 'اولویت',
	order_placeholder: 'اولویت...',
	slug: 'شناسه‌ی لینک',
	slug_placeholder: 'شناسه‌ی لینک...',

	subcategories: 'عناوین شغلی',
	job_positions: 'عناوین شغلی',

	active: 'فعال',
	deactive: 'غیرفعال',
	published: 'درکل',
	works_count: 'آگهی',
	state: 'وضعیت',
	edit_category: 'ویرایش دسته بندی',
	create_category: 'افزودن دسته بندی',
	create_subcategory: 'افزودن عنوان شغلی',
	edit_subcategory: 'ویرایش عنوان شغلی',
	publish_date: 'زمان ترتیب انتشار',
	first_publish_date: 'زمان اولین انتشار',
	creation_date: 'زمان ساخت',
	expire_date: 'زمان انقضا',
	incoming_call: 'ثبت تماس دریافتی',
	outgoing_call_success: 'ثبت تماس موفق',
	outgoing_call_failure: 'ثبت تماس ناموفق',
	message_templates: 'پیام های آماده',
	introduction_message: 'سلام و معرفی',

	create_ticket: 'تیکت جدید',
	support_active_question: 'وضعیت پشتیبانی',
	support_note_label: 'درباره کاربر',

	elevate: 'بالا آوردن',
	extend: 'تمدید',
	elevate_and_extend: 'تمدید و بالا آوردن',
	close: 'بستن',
	elevate_confirm: 'آیا مایلید این آگهی به بالای لیست آگهی ها بیاید؟',
	extend_confirm: 'آیا مایلید این آگهی ۳۰ روز تمدید شود؟',
	elevate_and_extend_confirm: 'آیا مایلید این آگهی ۳۰ روز تمدید شود و به بالای لیست آگهی ها بیاید؟',
	close_confirm: 'آیا مایلید این آگهی را ببندید؟',
};
