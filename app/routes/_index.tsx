import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Button, Center, Grid } from "@mantine/core";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { ControlSegment } from "~/components/ControlSegment";
import { NewRadioshowButton } from "~/features/Radioshow/components/NewRadioshowButton";
import { HighLightCardWithRadioshow } from "~/features/Highlight/components/HighLightCardWithRadioshow";
import { getViewedHighlights } from "~/features/Highlight/apis/getViewedHighlights";
import { updateHighlight } from "~/features/Highlight/apis/updateHighlight";
import { LoginNavigateModal } from "~/features/Auth/components/LoginNavigateModal";
import { useDisclosure } from "@mantine/hooks";
import { ShareButton } from "~/features/Highlight/components/ShareButton";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <ShareButton/>
    </>
  );
}

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const formData = await request.formData();
//   const played = formData.has("played")
//     ? formData.get("played") === "true"
//     : undefined;
//   const saved = formData.has("saved")
//     ? formData.get("saved") === "true"
//     : undefined;
//   const liked = formData.has("liked")
//     ? formData.get("liked") === "true"
//     : undefined;

//   const highlightId = Number(formData.get("id"));

//   try {
//     const updateResult = await updateHighlight(
//       // highlightId,
//       highlightId,
//       request,
//       played,
//       saved,
//       liked
//     );

//     return json({ result: updateResult });
//   } catch (error) {
//     return json({ error });
//   }
// };

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const highlightsWithRadioshow = await getViewedHighlights(request);
//   if (!highlightsWithRadioshow) {
//     throw new Response("Not Found", { status: 404 });
//   }
//   return json({ highlightsWithRadioshow });
// };

// export default function Index() {
//   const fetcher = useFetcher();
//   const data = useLoaderData<typeof loader>();
//   const [opened, { close }] = useDisclosure(true);

//   return (
//     <>
//       <ControlSegment />
//       <Grid mt={10} mx={"sm"} justify="center">
//         {data.highlightsWithRadioshow.map((card) => (
//           <Grid.Col key={card.id} span={{ base: 11, md: 6, lg: 3 }}>
//             <HighLightCardWithRadioshow
//               key={card.id}
//               id={card.id}
//               imageUrl={
//                 card.radioshow.imageUrl ?? "https://picsum.photos/200/300"
//               }
//               title={card.title}
//               radioshowTitle={card.radioshow.title}
//               description={card.description}
//               replayUrl={card.replayUrl}
//               createdAt={card.createdAt}
//               liked={
//                 card.userHighlights[0] ? card.userHighlights[0].liked : false
//               }
//               saved={
//                 card.userHighlights[0] ? card.userHighlights[0].saved : false
//               }
//               played={
//                 card.userHighlights[0] ? card.userHighlights[0].played : false
//               }
//               radioshowId={card.radioshow.id}
//             />
//           </Grid.Col>
//         ))}
//       </Grid>
//       <Center mt={"md"}>
//         <Button>もっと見る</Button>
//       </Center>

//       <LoginNavigateModal opened={opened} close={close} />

//       
//     </>
//   );
// }
