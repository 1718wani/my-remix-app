import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Button, Stack, TextInput, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  ActionFunctionArgs,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { IconX } from "@tabler/icons-react";
import { useEffect } from "react";
import { z } from "zod";
import { authenticator } from "~/features/Auth/services/authenticator";
import { RadioShowHeader } from "~/features/Highlight/components/RadioShowHeader";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
  return { user };
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log(formData.get("description"), "requestData");
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== "success") {
    return json({
      success: false,
      message: "データの送信に失敗しました",
      submission: submission.reply(),
    });
  }

  return redirect("/1");
}

const schema = z.object({
  title: z.string({ required_error: "タイトルは必要です" }),
  description: z.string().default("").optional(),
  replayUrl: z
    .string({ required_error: "再生用URLが必要です" })
    .url({ message: "再生用URLは有効なURL形式である必要があります" }),
});

export default function HightlightShare() {
  const data = useActionData<typeof action>();
  const [form, { title, description, replayUrl }] = useForm({
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
        title: "送信に失敗しました",
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
      <RadioShowHeader />
      <Form method="post" {...getFormProps(form)}>
        <Stack gap="md" mx={"xl"} mt={"lg"}>
          <Title order={2}>ハイライトシェア</Title>
          <TextInput
            {...getInputProps(title, { type: "text" })}
            name="title"
            placeholder="コーナー名/発言の内容など"
            label="タイトル"
            error={title.errors}
            required
          />

          <TextInput
            {...getInputProps(description, { type: "text" })}
            name="description"
            placeholder="ハイライトの説明"
            label="説明"
            error={description.errors}
          />

          <TextInput
            {...getInputProps(replayUrl, { type: "url" })}
            name="replayUrl"
            placeholder="https://example.com"
            label="再生用URL"
            error={replayUrl.errors}
            required
          />
          <Button fullWidth type="submit">
            ハイライトをシェア
          </Button>
        </Stack>
      </Form>
    </>
  );
}
