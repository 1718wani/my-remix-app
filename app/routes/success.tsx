import { Center, Image, Stack, Title } from "@mantine/core";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { authenticator } from "~/features/Auth/services/authenticator";

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin",
  });
}

export default function Success() {
  return (
    <>
      <Center mt={"xl"}>
        <Stack>
          <Title order={2}>ログインが成功しました</Title>
          <Link to={"/"}>これかな</Link>
        </Stack>
      </Center>
      <Image
        width="40"
        height="auto"
        fit="cover"
        src="/greenlisteninggirl.png"
        alt="success"
      />
    </>
  );
}
