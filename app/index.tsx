import { MyStack } from "../src/components/MyStack";
import AuthLinks from "@/modules/auth/AuthLinks";

export default function Home() {
  return (
    <MyStack>
      <AuthLinks />
    </MyStack>
  );
}
