import { Flex, Select, Title, rem } from "@mantine/core";
import { ShareButton } from "~/features/Highlight/components/ShareButton";

export default function Highlights() {
  return (
    <div>
      <Flex justify={"space-between"} m={"md"}>
        <Title order={2}>ハイライト一覧</Title>
        <Select
          withCheckIcon={false}
          w={rem(120)}
          defaultValue={"人気順"}
          data={["人気順", "新しい順", "保存済み"]}
          clearable={false}
          allowDeselect={false}
        />
      </Flex>
      <ShareButton />
    </div>
  );
}
