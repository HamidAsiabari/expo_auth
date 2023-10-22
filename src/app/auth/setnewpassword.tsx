import { Button, H3, XStack, YStack} from 'tamagui'
import { router } from 'expo-router'
import { ArrowLeft } from '@tamagui/lucide-icons'
import { MyStack } from '@components/MyStack'
import SetNewPasswordForm from '@/modules/auth/SetNewPasswordForm'

const setNewPassword = () => {
return (<MyStack justifyContent="flex-start">
      <XStack 
        alignItems="center"
        space="$2" >
        <Button icon={ArrowLeft} onPress={()=>router.push("/")} />
        <H3></H3>
      </XStack>
      <YStack padding="$3" space="$2" alignItems="center" justifyContent='flex-end'>
          <SetNewPasswordForm  />
      </YStack>
  </MyStack>)
}
export default setNewPassword