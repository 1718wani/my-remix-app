import {
  ActionFunctionArgs,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Link, Form, useActionData } from "@remix-run/react";
import { authenticator } from "~/features/Auth/services/authenticator";
import {
  Button,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { z } from "zod";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useEffect } from "react";
import { createUser } from "~/features/Auth/apis/createUser";
import { IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { checkUserExists } from "~/features/Auth/apis/checkUserExists";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
  return { user };
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log(formData, "requestSignup");
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== "success") {
    return json({
      success: false,
      message: "データの送信に失敗しました",
      submission: submission.reply(),
    });
  }

  // emailが存在していたらチェックする
  if (await checkUserExists(submission.value.email)) {
    return json({
      success: false,
      message: "このメールアドレスはすでに登録されています",
      submission: submission.reply(),
    });
  }
  await createUser(submission.value);
  return redirect("/signin");
}

const schema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Email is invalid"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "パスワードは8文字以上で入力してください")
    .regex(
      /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
      "パスワードは半角英数字混合で入力してください"
    ),
});

export default function Signup() {
  const data = useActionData<typeof action>();
  const [form, { name, email, password }] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  useEffect(() => {
    if (!data) return;
    if (!data.success) {
      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: "ユーザー登録に失敗しました",
        message: data.message,
        color: "red",
        icon: <IconX />,
      });
    }

    console.log(data);
    // {
    //   message: <server message>,
    //   submission: typeof SubmissionResult,
    //   success: <boolean>,
    // }

    if (data.success) {
      alert(data.message);
    }
  }, [data]);

  return (
    <>
      <Form method="post" {...getFormProps(form)}>
        <Stack gap="md" mx={"xl"} mt={"lg"}>
          <Title order={2}>新規ユーザー登録</Title>
          <TextInput
            {...getInputProps(name, { type: "text" })}
            name="name"
            placeholder="ユーザー名"
            label="Name"
            error={name.errors}
          />

          <TextInput
            {...getInputProps(email, { type: "email" })}
            name="email"
            placeholder="メールアドレス"
            label="Email"
            error={email.errors}
          />

          <PasswordInput
            {...getInputProps(password, { type: "password" })}
            name="password"
            placeholder="パスワード"
            label="Password"
            error={password.errors}
          />

          <Link
            to="/signin"
            style={{
              textDecoration: "none",
              width: "fit-content",
            }}
          >
            <Text
              size="sm"
              variant="gradient"
              fw={700}
              gradient={{ from: "blue", to: "blue.3" }}
            >
              登録済みの方はこちら
            </Text>
          </Link>
          <Button fullWidth type="submit">
            新規登録
          </Button>
        </Stack>
      </Form>
    </>
  );
}
