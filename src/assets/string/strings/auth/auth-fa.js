import {loginFa} from "./login/login-fa";
import {registerFa} from "./register/register-fa";
import {forgetPasswordFa} from "./forget-password/forget-password-fa";
import {resetPasswordFa} from "./reset-password/reset-password-fa";

export const authFa = {
	register: registerFa,
	login: loginFa,
	forget_password: forgetPasswordFa,
	reset_password: resetPasswordFa,
};
