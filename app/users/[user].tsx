import { ArrowLeft } from "@tamagui/lucide-icons";
import { useRouter, useSearchParams } from "expo-router";
import { Avatar, Button, Group, H3, H5, H6, ListItem, Paragraph, Separator, XGroup, XStack, YGroup, YStack } from "tamagui";

import { MyStack } from "../../src/components/MyStack";
export default function User() {
  const router = useRouter();
  const params = useSearchParams();

  return (
    <MyStack justifyContent="flex-start">
      <XStack
        alignItems="center"
        space="$2" >
        <Button icon={ArrowLeft}
          onPress={router.back} />
        <H3>{params.user}</H3>
      </XStack>
      <YStack padding="$3" space="$2" alignItems="center">
      <YGroup separator={<Separator  marginVertical='$3'/>}  alignItems="center" >
        <YGroup.Item>
              <Avatar circular size="$10">
              <Avatar.Image src="http://placekitten.com/200/300" />
              <Avatar.Fallback bc="red" />
            </Avatar>
            <H5>{params.user}</H5>
        </YGroup.Item>
        <YGroup.Item >
          <Paragraph>{`Sample bio text here.`}</Paragraph>
        </YGroup.Item>
      </YGroup>
    </YStack>
  </MyStack>);
}
