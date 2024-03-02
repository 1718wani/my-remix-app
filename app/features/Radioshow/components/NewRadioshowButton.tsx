import { Button } from "@mantine/core";
import { NavLink } from "@remix-run/react";

export const NewRadioshowButton = () => {
  return (
    <NavLink to={"/create"}>
      <Button
        className="pulse-button"
        size="lg"
        variant="filled"
        radius={"lg"}
        style={{ position: "fixed", right: 25, bottom: 25, zIndex: 1000 }}
      >
        新規登録
      </Button>
    </NavLink>
  );
};
