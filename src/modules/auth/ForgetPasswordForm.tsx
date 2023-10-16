import { CheckCircle, ChevronRight, Edit3 } from '@tamagui/lucide-icons';
import { useLayoutEffect, useState } from 'react'
import { Button,Text, Form, H4, Input, Spinner, Label, Separator, H5 } from 'tamagui'
import i18n from '@i18n/i18'
import { forget_password_submit, isEmailValid, isPasswordValid, request_set_new_password_submit } from '@modules/auth/auth.service';

export default function ForgetPasswordForm() {

const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off')
const [step, setStep] = useState<'requestValidationCode' | 'setNewPassword'>('requestValidationCode')

const [username, setUsername] = useState<string>('')
const [usernameIsValid, setUsernameIsValid] = useState<boolean>()

const [validationCode, setValidationCode] = useState<string>('')
const [validationCodeIsValid, setValidationCodeIsValid] = useState<boolean>()

const [password, setPassword] = useState<string>('')
const [passwordIsValid, setPasswordIsValid] = useState<boolean>()

const handleUsernameChange = (newText) => {
setUsername(newText);
};
const handlePasswordChange = (newText) => {
setPassword(newText);
};
const handleValidationCodeChange = (newText) => {
setValidationCode(newText);
};

const validateInputs=()=>{
    let areValid=false;
    setUsernameIsValid(isEmailValid(username))
    if(step=='setNewPassword'){
        setValidationCodeIsValid(validationCode.length>3)
        setPasswordIsValid(isPasswordValid(password))
        areValid = usernameIsValid && (step!='setNewPassword' ? true : (isPasswordValid(password) && validationCode.length>3) )
    }else{
        areValid = usernameIsValid
    }
    return areValid
}

useLayoutEffect(()=>{
      if((step=="requestValidationCode" && username.length > 9 ) || (step=="setNewPassword" && ( passwordIsValid === false || validationCodeIsValid===false))){
        validateInputs()
      }
},[username,password,validationCode])

const request_validatio_code=()=>{
    forget_password_submit(username).then((res)=>{
        if(res){
        setStep('setNewPassword')
        setStatus('off')
        }else{
        setStatus('off')
        }
    });
  }
  
  const request_set_new_password=()=>{
      const new_password_form: I_SetNewPasswordForm={
            username: username,
            code: validationCode,
            password: password
        }
        request_set_new_password_submit(new_password_form).then((res)=>{
          if(res){
            setStatus('submitted')
          }else{
            setStatus('off')
          }
    });
  }

  const submit_form_handler =() =>{
    const validationRes= validateInputs()
    if( status != 'off') return
    if(validationRes===true){
        setStatus("submitting");
        if(step=="requestValidationCode"){
            request_validatio_code();
        }else if(step=="setNewPassword"){
            request_set_new_password();
        }
    }
  }

  const edit_username=()=>{
    setStep('requestValidationCode')
    setStatus("off");
    setValidationCode('')
    setPassword('')
    setPasswordIsValid(undefined)
    setValidationCodeIsValid(undefined)
  }

  
  return (
    <Form onSubmit={() => submit_form_handler()}
     borderWidth={1} borderRadius="$4" gap="$2" backgroundColor="$background"
      
     padding="$5" 
     width="$21"
     
     borderColor="$borderColor" alignItems="center" >
        <H5>{i18n.t('forget_password_title')}</H5>
        <Separator  alignSelf="stretch"  marginVertical='$3' />

     {step === 'requestValidationCode' && <>
      <Label alignSelf='flex-start'  >{i18n.t('email_input_lable')}:</Label>
      <Input size="$4"   alignSelf='stretch' 
        textContentType='emailAddress' keyboardType="email-address"
        value={username}
        editable={(status === 'off')}
        borderColor={(usernameIsValid==undefined || usernameIsValid)? undefined : 'red'}
        focusStyle={{borderColor:(usernameIsValid==undefined ||usernameIsValid)? undefined : 'yellow'}}
        onChangeText={handleUsernameChange}
        id="email_input_lable_forgetpassword" borderWidth={1} 
        placeholder={i18n.t('email_input_lable')}/></>}

      {(step === 'setNewPassword') && <>
        <H5>{i18n.t('validation_code_sent_msg')}:</H5>
        <Button alignSelf='stretch' iconAfter={<Edit3 />}  onPress={()=>{edit_username()}}>{username}  edit</Button>

        <Label alignSelf='flex-start' htmlFor="validation_input_lable" >{i18n.t('validation_input_lable')}:</Label>
        <Input size="$4"   
            alignSelf='stretch'
            editable={(status === 'off')}
            value={validationCode}
            onChangeText={handleValidationCodeChange}
            borderColor={(validationCodeIsValid==undefined || validationCodeIsValid)? undefined : 'red'}
            focusStyle={{borderColor:(validationCodeIsValid==undefined || validationCodeIsValid)? undefined : 'yellow'}}
            id="validation_input_lable"
            borderWidth={1}  placeholder={i18n.t('validation_input_lable')}/>

        <Label alignSelf='flex-start' >{i18n.t('pass_input_lable')}:</Label>
        <Input size="$4" secureTextEntry  new-password
            editable={(status === 'off')}
            alignSelf='stretch'
            value={password}
            onChangeText={handlePasswordChange}
            borderColor={(passwordIsValid==undefined || passwordIsValid)? undefined : 'red'}
            focusStyle={{borderColor:(passwordIsValid==undefined || passwordIsValid)? undefined : 'yellow'}}
            id="pass_input_lable_forgetpassword"
            borderWidth={1} 
            placeholder={i18n.t('pass_input_lable')}/>
    </>}
    <Form.Trigger asChild disabled={status !== 'off'} marginTop="$3">
        <Button alignSelf='stretch' size="$4" theme="active_Button"
            iconAfter={(status === 'submitting') ? ( <Spinner /> ):((status === 'off') ? ChevronRight : <CheckCircle color='$green9' />) }>
            {step=="requestValidationCode" ? i18n.t('submit') : i18n.t('setNewPasswordBtn') }</Button>
    </Form.Trigger>
</Form>)
}