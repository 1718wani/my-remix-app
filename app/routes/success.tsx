import { Center, Image, Stack, Text, Title } from "@mantine/core";
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
          <Center>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Text
                size="sm"
                variant="gradient"
                fw={700}
                gradient={{ from: "blue", to: "blue.3" }}
              >
                一覧に戻る
              </Text>
            </Link>
          </Center>
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
