import { Button } from "@mantine/core";
import { NavLink } from "@remix-run/react";
import "./ShareButton.module.css"

export const ShareButton = ({ radioshowId }: { radioshowId: number }) => {
  return (
    <NavLink to={`/${radioshowId}/share`}>
      <Button
        className="pulse-button"
        size="lg"
        variant="filled"
        radius={"lg"}
        style={{ position: "fixed", right: 25, bottom: 25, zIndex: 1000 }}
      >
        Share
      </Button>
    </NavLink>
  );
};
