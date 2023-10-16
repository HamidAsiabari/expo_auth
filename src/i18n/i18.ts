import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
const translations = {
  en: { 
  welcome: 'Welcome',
  go_to_signup:"Create new account",
  go_to_signin:"Do you have an account? sign in",
  go_to_test_profile:"Show Hamid's Profile",
  
  signup_title: 'Create new account',
  email_input_lable:"Enter your email address",
  pass_input_lable:"Enter password",
  pass_verify_input_lable:"Enter your password again",
  validation_input_lable:"Enter validation code",

  signin_title: 'Login',
  forget_password_title: 'Reset password',
  go_to_forget_password:"I forgot my password",
  setNewPasswordBtn:"Set new password",
  validation_code_sent_msg:"Validation code has been sent",
  firstname:"First name",
  lastname:"Last name",
  submit:"Submit"
  },
  ja: { welcome: 'こんにちは' },
};
const i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;
export default i18n;