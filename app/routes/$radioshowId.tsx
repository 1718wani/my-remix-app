import { ShareButton } from "~/features/Highlight/components/ShareButton";
import { RadioShowHeader } from "~/features/Highlight/components/RadioShowHeader";
import { Grid } from "@mantine/core";
import { HighLightCard } from "~/features/Highlight/components/HighLightCard";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getRadioshowById } from "~/features/Radioshow/apis/getRadioshoById";
import { updateHighlight } from "~/features/Highlight/apis/updateHighlight";
import { EmptyHighlight } from "~/features/Highlight/components/EmptyHighlight";
import { getHighlightsForRadioshow } from "~/features/Highlight/apis/getHighlightsForRadioshow";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.radioshowId, "Missing contactId param");
  const radioshowId = parseInt(params.radioshowId, 10);
  invariant(!isNaN(radioshowId), "radioshowId must be a number");
  const radioshow = await getRadioshowById(radioshowId);
  invariant(radioshow, "Radioshow not found");

  const highlights = await getHighlightsForRadioshow(radioshowId);
  if (!highlights) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ radioshow, highlights });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const played = formData.has("played")
    ? formData.get("played") === "true"
    : undefined;
  const saved = formData.has("saved")
    ? formData.get("saved") === "true"
    : undefined;
  const liked = formData.has("liked")
    ? formData.get("liked") === "true"
    : undefined;

  const highlightId = Number(formData.get("id"));

  try {
    const updateResult = await updateHighlight(
      // highlightId,
      highlightId,
      request,
      played,
      saved,
      liked
    );
    return json({ success: true, updateResult });
  } catch (error) {
    return json({ success: false, error: "Failed to update highlight." });
  }
};

// userId一致だけ抜き出しているので、今は0番目だけ抜き出して表示している。
export default function Highlights() {
  const { radioshow, highlights } = useLoaderData<typeof loader>();
  return (
    <>
      <RadioShowHeader
        radioshowImageUrl={radioshow.imageUrl}
        radioshowTitle={radioshow.title}
      />
      <>
        {highlights.length > 0 ? (
          <Grid mt={10} mx={"sm"} justify="center">
            {highlights.map((highlight) => (
              <Grid.Col key={highlight.id} span={{ base: 11, md: 6, lg: 3 }}>
                <HighLightCard
                  id={highlight.id}
                  title={highlight.title}
                  description={highlight.description}
                  playUrl={highlight.replayUrl}
                  createdAt={highlight.createdAt}
                  liked={
                    highlight.userHighlights[0]
                      ? highlight.userHighlights[0].liked
                      : false
                  }
                  saved={
                    highlight.userHighlights[0]
                      ? highlight.userHighlights[0].saved
                      : false
                  }
                  played={
                    highlight.userHighlights[0]
                      ? highlight.userHighlights[0].played
                      : false
                  }
                />
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <EmptyHighlight />
        )}
      </>

      <ShareButton radioshowId={radioshow.id} />
    </>
  );
}
