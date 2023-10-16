export const signup_submit=async (form: I_SignUpForm)=>{
   const validationRes = isSignUpFormValid(form)
    return await waitAndReturnBoolean(validationRes)
}
 
export function isEmailValid(email: string): boolean {
    if(email=='') return false
// Regular expression to validate email format
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
return emailRegex.test(email);
}

function isSignUpFormValid(form: I_SignUpForm): boolean {
    if (isEmailValid(form.username)) {
        // You can add additional password validation here
        return isPasswordValid(form.password) // For example, require a minimum password length
    }
    return false;
}

export function isPasswordValid(password:string): boolean {
    return password.length >= 4; // For example, require a minimum password length

}


export const forget_password_submit=async (username: string)=>{
    const validationRes = isEmailValid(username)
     return await waitAndReturnBoolean(validationRes)
 }

 export const request_set_new_password_submit=async (form: I_SetNewPasswordForm)=>{
     return await waitAndReturnBoolean(true)
 }

function waitAndReturnBoolean(returnValue:boolean) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(returnValue);
      }, 2000); // 2000 milliseconds (2 seconds)
    });
  }