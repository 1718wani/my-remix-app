import { Button } from "@mantine/core";
import { NavLink } from "@remix-run/react";
import "./ShareButton.module.css"

export const ShareButton = () => {
  return (
    <NavLink to={"/1/share"}>
      <Button
        className="pulse-button"
        variant="filled"
        radius={"lg"}
        style={{ position: "fixed", right: 20, bottom: 20, zIndex: 1000 }}
      >
        Share
      </Button>
    </NavLink>
  );
};
