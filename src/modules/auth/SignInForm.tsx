import { CheckCircle, ChevronRight, Key } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import {  useState } from 'react'
import { Button, Form, H4, Input, Spinner, Label, Separator } from 'tamagui'
import i18n from '@i18n/i18'
import { isEmailValid, isPasswordValid, signup_submit } from '@modules/auth/auth.service';

export default function SignInForm() {

  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off')
  const [username, setUsername] = useState<string>('')
  const [usernameIsValid, setUsernameIsValid] = useState<boolean>(true)
  const [password, setPassword] = useState<string>('')
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true)

  const handleUsernameChange = (usernameText:string) => {
    setUsername(usernameText);
    if(usernameText.length>0){
      setUsernameIsValid(isEmailValid(usernameText))
    } else{
      setUsernameIsValid(true)
    }
  };

  const handlePasswordChange = (passwordText:string) => {
    setPassword(passwordText);
    if(passwordText.length>0){
      setPasswordIsValid(isPasswordValid(passwordText))
    } else{
      setPasswordIsValid(true)
    }
  };

  const submit_form_handler =() =>{
    setStatus("submitting");
    setUsernameIsValid(isEmailValid(username))
    setPasswordIsValid(isPasswordValid(password))
    
    const form:I_SignUpForm ={
      username: username,
      password: password
    }
    if(isEmailValid(username) && isPasswordValid(password) ){
        signup_submit(form).then((res)=>{
          if(res){
            setStatus('submitted')
          }else{
            setStatus('off')
          }
    });
    }else{
      setStatus('off')
    }
  }

  
  return (
    <Form
      alignItems="center"
      gap="$2"
      onSubmit={() => submit_form_handler()}
      borderWidth={1}
      borderRadius="$4"
      backgroundColor="$background"
      borderColor="$borderColor"
      padding="$5" 
      width="$21"
      >
      <H4>{i18n.t('signin_title')}</H4>
     <Separator  alignSelf="stretch"  marginVertical='$3' />
      <Label alignSelf='flex-start' htmlFor="email_input_lable" >{i18n.t('email_input_lable')}:</Label>
      <Input size="$4"  alignSelf='stretch'
      textContentType='emailAddress' inputMode="email"
      value={username}
      disabled={(status !== 'off')}

      borderColor={(usernameIsValid)? undefined : 'red'}
      focusStyle={{borderColor:(usernameIsValid)? undefined : 'yellow'}}
      onChangeText={handleUsernameChange}
      id="email_input_lable" borderWidth={1} 
       placeholder={i18n.t('email_input_lable')}/>

      <Label alignSelf='flex-start' htmlFor="pass_input_lable" >{i18n.t('pass_input_lable')}:</Label>
      <Input size="$4" secureTextEntry   alignSelf='stretch'
      value={password}
      disabled={(status !== 'off')}
      onChangeText={handlePasswordChange}
      borderColor={(passwordIsValid)? undefined : 'red'}
      focusStyle={{borderColor:(passwordIsValid)? undefined : 'yellow'}}
      new-password id="pass_input_lable"
      borderWidth={1}  placeholder={i18n.t('pass_input_lable')}/>

      <Form.Trigger asChild disabled={status !== 'off'} marginTop="$3">
        <Button alignSelf='stretch' size="$4" theme="active_Button"
         iconAfter={(status === 'submitting') ? ( <Spinner /> ):((status === 'off') ? ChevronRight : <CheckCircle color='$green9' />) }
         >{i18n.t('submit')}</Button>
      </Form.Trigger>
      <Button alignSelf='flex-start' paddingLeft='$0' size="$3" variant='outlined'  
         icon={Key} onPress={()=> router.push("/auth/forgetpassword")}
         >{i18n.t('go_to_forget_password')}</Button>
    </Form>)
}