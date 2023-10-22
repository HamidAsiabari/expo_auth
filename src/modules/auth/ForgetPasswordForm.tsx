import { CheckCircle, ChevronRight, Edit3 } from '@tamagui/lucide-icons';
import { useLayoutEffect, useState } from 'react'
import { Button,Text, Form, H4, Input, Spinner, Label, Separator, H5 } from 'tamagui'
import i18n from '@i18n/i18'
import { forget_password_submit } from '@modules/auth/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { router } from 'expo-router';

const schema = z.object({
  username: z.string().min(1, { message: 'Required' }),
});
export default function ForgetPasswordForm() {
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off')

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    setStatus("submitting");
    forget_password_submit(data.username).then((res)=>{
    if(res){
      router.push(`/auth/setnewpassword/?username=${data.username}`)
    setStatus('off')
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
          <H4>{i18n.t('forget_password_title')}</H4>
          <Separator  alignSelf="stretch"  marginVertical='$3' />
          <Label alignSelf='flex-start' htmlFor="usename" >{i18n.t('email_input_lable')}:{errors.username && <Text> This is required.</Text>}</Label>
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
            textContentType='emailAddress' inputMode="email"
            disabled={(status !== 'off')}
            borderWidth={1} 
            placeholder={i18n.t('email_input_lable')}/>
          )}
        name="username"
      />
      <Form.Trigger asChild disabled={status !== 'off'} marginTop="$3">
        <Button alignSelf='stretch' size="$4" theme="active_Button" 
         iconAfter={(status === 'submitting') ? ( <Spinner /> ):((status === 'off') ? ChevronRight : <CheckCircle color='$green9' />) }
         >{i18n.t('submit')}</Button>
      </Form.Trigger>
      </Form>);

}