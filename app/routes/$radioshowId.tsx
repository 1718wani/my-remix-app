
import { ShareButton } from "~/features/Highlight/components/ShareButton";
import { HighLightsList } from "~/features/Highlight/components/HighLightsList";
import { RadioShowHeader } from "~/features/Highlight/components/RadioShowHeader";

export default function Highlights() {
  return (
    <>
      <RadioShowHeader />
      <HighLightsList />
      <ShareButton />
    </>
  );
}
