import { ShareButton } from "~/features/Highlight/components/ShareButton";
import { RadioShowHeader } from "~/features/Highlight/components/RadioShowHeader";
import { Grid } from "@mantine/core";
import { HighLightCard } from "~/features/Highlight/components/HighLightCard";
import { json } from "@remix-run/node";
import { getAllHighlights } from "~/features/Highlight/apis/getAllHighlights";
import invariant from "tiny-invariant";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getRadioshowById } from "~/features/Radioshow/apis/getRadioshoById";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.radioshowId, "Missing contactId param");
  const radioshowId = parseInt(params.radioshowId, 10);
  invariant(!isNaN(radioshowId), "radioshowId must be a number");
  const radioshow = await getRadioshowById(radioshowId);
  invariant(radioshow, "Radioshow not found");

  const highlights = await getAllHighlights(radioshowId);
  if (!highlights) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ radioshow, highlights });
};

export default function Highlights() {
  const { radioshow, highlights } = useLoaderData<typeof loader>();
  return (
    <>
      <RadioShowHeader
        radioshowImageUrl={radioshow.imageUrl}
        radioshowTitle={radioshow.title}
      />
      <>
        <Grid mt={10} mx={"sm"} justify="center">
          {highlights.map((highlight) => (
            <Grid.Col
              key={highlight.description}
              span={{ base: 11, md: 6, lg: 3 }}
            >
              <HighLightCard
                title={highlight.title}
                description={highlight.description}
                playUrl={highlight.replayUrl}
              />
            </Grid.Col>
          ))}
        </Grid>
      </>

      <ShareButton radioshowId={radioshow.id} />
    </>
  );
}
