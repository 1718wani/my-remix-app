import { Card, Image, Text } from "@mantine/core";
import { NavLink } from "@remix-run/react";

type props = {
  imageUrl: string;
  title: string;
};

export const RadioShowsCard = (props: props) => {
  const { imageUrl, title} = props;

  return (
    <NavLink to={"/1"}>
      <Card shadow="sm" padding="xl" component="a" withBorder>
        <Card.Section>
          <Image src={imageUrl} h={160} />
        </Card.Section>

        <Text fw={500} size="lg" mt="md">
          {title}
        </Text>

       
      </Card>
    </NavLink>
  );
};
