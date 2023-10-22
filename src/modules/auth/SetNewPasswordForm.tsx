import { CheckCircle, ChevronRight } from '@tamagui/lucide-icons';
import {  useState } from 'react'
import { Button,Text, Form, H4, Input, Spinner, Label, Separator, H5 } from 'tamagui'
import i18n from '@i18n/i18'
import {   request_set_new_password_submit } from '@modules/auth/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useLocalSearchParams } from 'expo-router';

const schema = z.object({
  username: z.string().min(1, { message: 'Required' }),
  validationCode: z.string().min(1, { message: 'Required' }),
  password: z.string().min(1, { message: 'Required' }),
});

export default function SetNewPasswordForm() {
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off')
  const { username } = useLocalSearchParams<{ username: string }>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    
    defaultValues: {
      username: username,
      validationCode: "",
      password:""
    } ,
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: any) => {
    setStatus("submitting");
    console.log(data)
    request_set_new_password_submit(data).then((res)=>{
      if(res){
        setStatus('submitted')
      }else{
        setStatus('off')
      }
    });
  }

 
  return (
    <Form
        alignItems="center"
        gap="$2"
        onSubmit={ handleSubmit(onSubmit)}
        borderWidth={1}
        borderRadius="$4"
        backgroundColor="$background"
        borderColor="$borderColor"
        padding="$5" 
        width="$21"
        >
          <H4>{i18n.t('validation_code_sent_msg')}</H4>
          <Separator  alignSelf="stretch"  marginVertical='$3' />
  <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
          disabled

          onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            size="$4"  alignSelf='center'
            textContentType='emailAddress' inputMode="email"
            borderWidth={0} 
            placeholder={i18n.t('email_input_lable')}/>
          )}
        name="username"
      />
      <Label alignSelf='flex-start' htmlFor="validationCode" >{i18n.t('validation_input_lable')}:{errors.validationCode && <Text> This is required.</Text>}</Label>
          <Controller
          control={control}
          rules={{
          required: true,
          }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            size="$4"  alignSelf='stretch'
            inputMode="numeric"
            disabled={(status !== 'off')}
            borderWidth={1} 
            placeholder={i18n.t('validation_input_lable')}/>
          )}
          name="validationCode"
          />
          <Label alignSelf='flex-start' htmlFor="password" >{i18n.t('pass_input_lable')}:{errors.password && <Text> This is required.</Text>}</Label>
        <Controller
          control={control}
          rules={{
          required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            size="$4"  alignSelf='stretch'
            inputMode="text"
            textContentType="newPassword"
            disabled={(status !== 'off')}
            borderWidth={1} 
            placeholder={i18n.t('pass_input_lable')}/>
          )}
          name="password"
          />
          
      <Form.Trigger asChild disabled={status !== 'off'} marginTop="$3">
        <Button alignSelf='stretch' size="$4" theme="active_Button" 
         iconAfter={(status === 'submitting') ? ( <Spinner /> ):((status === 'off') ? ChevronRight : <CheckCircle color='$green9' />) }
         >{i18n.t('setNewPasswordBtn')}</Button>
      </Form.Trigger>
      </Form>);

}