import { AspectRatio, Box, Image, Overlay, Title } from "@mantine/core";

export const RadioShowHeader = () => {
  return (
    <>
      <AspectRatio
        ratio={16 / 9}
        h={160}
        w={"full"}
        style={{ position: "relative" }}
      >
        <Image
          src={
            "https://www.allnightnippon.com/wp/assets/uploads/2021/03/4a736cbd7927c15338fa9fe13bae42f2.jpg"
          }
          w={"full"}
          h={160}
        />
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 60%)"
          opacity={0.85}
          h={160}
          style={{ position: "absolute", top: 0, left: 0, right: 0 }}
        />
        <Box>
          <Title
            order={3}
            c={"gray.0"}
            style={{ position: "absolute", left: 0, bottom: 0, zIndex: 1000 }}
            p={8}
          >
            霜降り明星のオールナイトニッポン
          </Title>
        </Box>
      </AspectRatio>
    </>
  );
};
