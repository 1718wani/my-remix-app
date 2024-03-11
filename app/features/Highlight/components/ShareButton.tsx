import { Button } from "@mantine/core";
import { NavLink } from "@remix-run/react";
import "./ShareButton.module.css"

export const ShareButton = () => {
  return (
    <NavLink to={"/highlight-share"}>
      <Button
        className="pulse-button"
        size="lg"
        variant="filled"
        radius={"lg"}
        style={{ position: "fixed", right: 30, bottom: 50, zIndex: 1000 }}
      >
        Share
      </Button>
    </NavLink>
  );
};
