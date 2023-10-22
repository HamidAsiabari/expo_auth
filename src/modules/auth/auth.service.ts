//Signup
export const signup_submit=async (form: I_SignUpForm)=>{
    return await waitAndReturnBoolean(true)
}

export const forget_password_submit=async (username: string)=>{
     return await waitAndReturnBoolean(true)
 }

 export const request_set_new_password_submit=async (form: I_SetNewPasswordForm)=>{
     return await waitAndReturnBoolean(true)
 }

 function calculatePasswordStrength(password: string): number {
    // Initialize the score
    let score = 0;
  
    // Check for password length
    if (password.length >= 8) {
      score += 10;
    } else if (password.length >= 6) {
      score += 5;
    }
  
    // Check for character diversity
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
  
    const diversityChecks = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialCharacters];
    const numDiversityChecks = diversityChecks.filter((check) => check).length;
    score += numDiversityChecks * 10;
  
    return Math.max(0, Math.min(100, score));
  }


function waitAndReturnBoolean(returnValue:boolean) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(returnValue);
      }, 2000); // 2000 milliseconds (2 seconds)
    });
  }