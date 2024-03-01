import { json, type MetaFunction } from "@remix-run/node";
import { Grid } from "@mantine/core";
import { getAllRadioshows } from "~/features/Radioshow/apis/getAllRadioshows";
import { useLoaderData } from "@remix-run/react";
import { ControlSegment } from "~/components/ControlSegment";
import { NewRadioshowButton } from "~/features/Radioshow/components/NewRadioshowButton";
import { RadioShowsCard } from "~/features/Radioshow/components/RadioShowsCard";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const radioShows = await getAllRadioshows();
  if (!radioShows) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ radioShows });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <ControlSegment />
      <Grid mt={10} mx={"sm"} justify="center">
        {data.radioShows.map((card) => (
          <Grid.Col key={card.id} span={{ base: 11, md: 6, lg: 3 }}>
            <RadioShowsCard
              key={card.id}
              imageUrl={card.imageUrl ?? "https://picsum.photos/200/300"}
              title={card.title}
              
            />
          </Grid.Col>
        ))}
      </Grid>
      <NewRadioshowButton />
    </>
  );
}
