import {
  Card,
  Text,
  Accordion,
  Group,
  ActionIcon,
  Flex,
  useMantineTheme,
  Button,
  Badge,
} from "@mantine/core";
import { IconBookmark, IconHeart } from "@tabler/icons-react";

type props = {
  title: string;
  description: string;
  playUrl: string;
};

export const HighLightCard = (props: props) => {
  const { title, description, playUrl } = props;
  const theme = useMantineTheme();
  return (
    <>
      <Card withBorder padding="md" radius="md" mx={"sm"}>
        <Badge w="fit-content" variant="light">
          NEW !
        </Badge>
        <Flex justify={"space-between"} mx={"sm"}>
          <Text truncate fz="xl" fw={700} mt="sm">
            {title}
          </Text>
          <Group gap={6}>
            <ActionIcon variant="subtle" color="gray">
              <IconHeart color={theme.colors.red[6]} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              <IconBookmark color={theme.colors.yellow[6]} />
            </ActionIcon>
          </Group>
        </Flex>

        <Accordion>
          <Accordion.Item value="test">
            <Accordion.Control>説明</Accordion.Control>
            <Accordion.Panel>
              <Text fz="sm" c="dimmed" mt={5}>
                {description}
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Button
          component="a" // ここで 'a' タグを指定
          href={playUrl} // 遷移先のURLを指定
          target="_blank"
          variant="gradient"
          gradient={{
            from: "rgba(4, 201, 47, 1)",
            to: "rgba(87, 70, 70, 1)",
            deg: 158,
          }}
          mt={"sm"}
          mx={"lg"}
        >
          Spotifyで再生する
        </Button>
      </Card>
    </>
  );
};

// gradient={{ from: 'red', to: 'rgba(87, 70, 70, 1)', deg: 158 }}
