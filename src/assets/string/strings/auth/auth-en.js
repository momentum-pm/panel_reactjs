import {registerEn} from "./register/register-en";
import {loginEn} from "./login/login-en";
import {forgetPasswordEn} from "./forget-password/forget-password-en";
import {resetPasswordEn} from "./reset-password/reset-password-en";

export const authEn = {
	register: registerEn,
	login: loginEn,
	forget_password: forgetPasswordEn,
	reset_password: resetPasswordEn,
};
