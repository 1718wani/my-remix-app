import { Grid } from "@mantine/core";
import { HighLightCard } from "./HighLightCard";

export const HighLightsList = () => {
  const CardData = [
    {
      title: "SpotifyOK",
      description:
        "ｊふぁいｊふぃおえわｊふぃおわｆじをｆじあおｆｊわいおｆじぇわいおｆじおｆｊわいおｆじぇをいｆｊわいおｆじゃいおｆｊ",
      playUrl:
        "https://open.spotify.com/episode/1aEZAwA3UHI6WqS8ktZFtF?si=i8MvZXESTJWwpFq6fh-uaQ&t=5&context=spotify%3Aepisode%3A1aEZAwA3UHI6WqS8ktZFtF",
    },
    {
      title: "YoutubeOK",
      description:
        "ｊふぁいｊふぃおえわｊふぃおわｆじをｆじあおｆｊわいおｆじぇわいおｆじおｆｊわいおｆじぇをいｆｊわいおｆじゃいおｆｊ",
      playUrl: "https://youtu.be/s5S9a3kaK7k?t=90",
    },
    {
      title: "SpotifyOK",
      description:
        "ｊふぁいｊふぃおえわｊふぃおわｆじをｆじあおｆｊわいおｆじぇわいおｆじおｆｊわいおｆじぇをいｆｊわいおｆじゃいおｆｊ",
      playUrl:
        "https://open.spotify.com/episode/1aEZAwA3UHI6WqS8ktZFtF?si=i8MvZXESTJWwpFq6fh-uaQ&t=5&context=spotify%3Aepisode%3A1aEZAwA3UHI6WqS8ktZFtF",
    },
    {
      title: "YoutubeOK",
      description:
        "ｊふぁいｊふぃおえわｊふぃおわｆじをｆじあおｆｊわいおｆじぇわいおｆじおｆｊわいおｆじぇをいｆｊわいおｆじゃいおｆｊ",
      playUrl: "https://youtu.be/s5S9a3kaK7k?t=90",
    },
    {
      title: "SpotifyOK",
      description:
        "ｊふぁいｊふぃおえわｊふぃおわｆじをｆじあおｆｊわいおｆじぇわいおｆじおｆｊわいおｆじぇをいｆｊわいおｆじゃいおｆｊ",
      playUrl:
        "https://open.spotify.com/episode/1aEZAwA3UHI6WqS8ktZFtF?si=i8MvZXESTJWwpFq6fh-uaQ&t=5&context=spotify%3Aepisode%3A1aEZAwA3UHI6WqS8ktZFtF",
    },
    {
      title: "YoutubeOK",
      description:
        "ｊふぁいｊふぃおえわｊふぃおわｆじをｆじあおｆｊわいおｆじぇわいおｆじおｆｊわいおｆじぇをいｆｊわいおｆじゃいおｆｊ",
      playUrl: "https://youtu.be/s5S9a3kaK7k?t=90",
    },
  ];

  return (
    <Grid mt={10} mx={"sm"} justify="center">
      {CardData.map((card) => (
        <Grid.Col key={card.description} span={{ base: 11, md: 6, lg: 3 }}>
          <HighLightCard
            title={card.title}
            description={card.description}
            playUrl={card.playUrl}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
};
