import { SegmentedControl } from "@mantine/core";

export const ControlSegment = () => {
  return (
    <SegmentedControl
      m={"sm"}
      radius="sm"
      size="sm"
      data={["All", "Favorite", "New"]}
    />
  );
};
