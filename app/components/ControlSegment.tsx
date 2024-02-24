import { SegmentedControl } from "@mantine/core";

export const ControlSegment = () => {
  return (
    <SegmentedControl
      m={"sm"}
      radius="sm"
      size="sm"
      data={["番組一覧", "お気に入り切り抜き", "新しい切り抜き"]}
    />
  );
};
