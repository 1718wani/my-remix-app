import { Avatar, Box, Flex, Text } from "@mantine/core";

export const HeaderComponent = () => {
  return (
    <Box w={"full"} bg={"blue"} h={"42"}>
      <Flex align={"center"} justify={"space-between"} mx={"sm"}>
        <Text fw={700} fs="italic" size="xl" c={"gray.1"}>
          RadiMoment
        </Text>
        <Avatar radius="xl" c="dark" />
      </Flex>
    </Box>
  );
};
