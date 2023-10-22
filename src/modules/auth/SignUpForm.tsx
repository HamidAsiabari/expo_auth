import { CheckCircle, ChevronRight } from '@tamagui/lucide-icons';
import {  useState } from 'react'
import {Text, Button, Form, H4, Input, Spinner, Label, Separator, View } from 'tamagui'
import i18n from '@i18n/i18'
import { signup_submit } from '@modules/auth/auth.service';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  username: z.string().min(1, { message: 'Required' }),
  password: z.string().min(1, { message: 'Required' }),
});

export default function SignUpForm() {
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
  signup_submit(data).then((res)=>{
    if(res){
      setStatus('submitted')
    }else{
      setStatus('off')
    }
  })
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
          <H4>{i18n.t('signup_title')}</H4>
          <Separator  alignSelf="stretch"  marginVertical='$3' />
          <Label alignSelf='flex-start' htmlFor="usename" >{i18n.t('email_input_lable')}:{errors.username && <Text> This is required.</Text>}</Label>
        <Controller
        control={control}
        rules={{ required: true  }}
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
      
      <Label alignSelf='flex-start' htmlFor="pass_input_lable_signup" >{i18n.t('pass_input_lable')}:{errors.password && <Text> This is required.</Text>}</Label>
      <Controller
        control={control}
        rules={{ maxLength: 100}}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder={i18n.t('pass_input_lable')}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            size="$4" secureTextEntry  alignSelf='stretch'
            disabled={(status !== 'off')}
            new-password 
            borderWidth={1} />
         )}
        name="password"
      />
      <Form.Trigger asChild disabled={status !== 'off'} marginTop="$3">
        <Button alignSelf='stretch' size="$4" theme="active_Button" 
         iconAfter={(status === 'submitting') ? ( <Spinner /> ):((status === 'off') ? ChevronRight : <CheckCircle color='$green9' />) }
         >{i18n.t('submit')}</Button>
      </Form.Trigger>
      </Form>);
}