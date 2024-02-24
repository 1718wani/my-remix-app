import { Title } from "@mantine/core";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { createRadioshow } from "~/features/Radioshow/apis/createRadioshow";
import { RadioshowCreateForm } from "~/features/Radioshow/components/RadioshowCreateForm";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const imageUrl = formData.get("imageUrl") as string;
  await createRadioshow({ title, imageUrl });
  return redirect("/");
};

export default function RadioshowCreate() {
  return (
    <>
      <Title m={"md"} order={2}>
        新しいラジオ番組登録
      </Title>
      <RadioshowCreateForm />
    </>
  );
}
