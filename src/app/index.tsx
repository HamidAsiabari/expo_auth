import { MyStack } from "@components/MyStack";
import AuthLinks from "@modules/auth/AuthLinks";

export default function Home() {
  return (
    <MyStack>
      <AuthLinks />
    </MyStack>
  );
}
// registerRootComponent(Home);
