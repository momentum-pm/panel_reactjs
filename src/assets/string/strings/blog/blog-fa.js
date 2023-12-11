export const blogFa = {
	title_label: 'تیتر مقاله',
	title_placeholder: 'مثلا: ۵ راهکار بهبود seo...',
	meta_title_label: 'تیتر افزونه',
	meta_title_placeholder: 'مثلا: ۵ راهکار بهبود seo...',

	description_title: 'توضیح کلی',
	description_placeholder: 'توضیح کلی از مقاله',
	meta_description_title: 'توضیح کلی افزونه',
	meta_description_placeholder: 'توضیح کلی از مقاله',

	image_label: 'تصویر',
	image_placeholder: 'تصویر اصلی...',

	meta_image_label: 'تصویر افزونه',
	meta_image_placeholder: 'تصویر افزونه...',


	state_label: 'وضعیت',
	publish_date_title: 'زمان انتشار',
	author: 'نویسنده',
	state_placeholder: 'انتخاب از لیست...',

	show_in_home_question: 'نمایش در صفحه اصلی',

	time_to_read_label: 'زمان مطالعه',
	time_to_read_placeholder: 'زمان مطالعه به ثانیه...',

	slug_label: 'slug',
	slug_placeholder: 'مثلا: 5-ways-to-be-freelancer',
	state_to_title: {
		draft: 'پیشنویس',
		published: 'منتشر شده',
		course: 'مقاله دوره',
	},
	subcategories_label: 'انتخاب کنید (انتخاب جند مورد مجاز است)',
	create_post_button: 'مقاله جدید',
	edit_post_button: 'ویرایش',
	edit_post_page: 'ویرایش مقاله',
	add_part: 'افزودن بخش جدید',
	part_subtype: 'نوع بخش',
	paragraph_subtype: 'متن با تصویر اختیاری',
	image_part_subtype: 'تصویر وسط چین',
	course_promotion_subtype: 'تبلیغ دوره',

	view_post_button: 'مشاهده',
	author_posts: 'مقاله های من',

	post_title: 'عنوان مقاله',
	no_title: 'بدون عنوان',


	spacing_top_label: 'فاصله از بالا',
	spacing_bottom_label: 'فاصله از پایین',
	spacing_placeholder: 'انتخاب از لیست...',
	background_color_label: 'رنگ پس زمینه',
	background_color_placeholder: 'انتخاب از لیست...',
	action_box_label: 'نوع لینک',
	action_box_placeholder: 'انتخاب از لیست...',

	image_location_to_title: (image_location) => {
		switch (image_location) {
			case 'start':
				return 'قبل از متن';
			case 'end':
				return 'بعد از متن';
			default:
				return null;

		}
	},
	image_location_label: 'محل تصویر',
	image_location_placeholder: 'انتخاب از لیست...',

	content_label: 'متن',
	content_placeholder: 'متن...',
	image_alt_label: 'توضیحات تصویر',
	image_alt_placeholder: 'درباره تصویر...',
	image_caption_label: 'زیرنویس عکس',
	image_caption_placeholder: 'زیرنویس عکس...',
	paragraph_image_label: 'تصویر',
	course_placeholder: 'انتخاب از لیست...',
	course_label: 'دوره آموزشی',
	paragraph_image_placeholder: 'آپلود تصویر...',
	start_learning: 'شروع یادگیری',

	attachments_label: 'فایل های پیوست',
	attachments_placeholder: 'آپلود فایل...',

	save_part: 'ذخیره',
	edit_part: 'ویرایش',
	delete_part: 'حذف',
	close_part: 'انصراف از تغییرات',

	save_post: 'ذخیره اطلاعات پست',
	recalculate_time_to_read: 'محاسبه زمان',

	delete_post: 'حذف پست',
	delete_post_message: 'آیا پست حذف شود؟',
	fill_slug: 'پر کردن slug',

};
