import { Button } from "@mantine/core";
import { NavLink } from "@remix-run/react";

export const NewRadioshowButton = () => {
  return (
    <NavLink to={"/create"}>
      <Button
        className="pulse-button"
        variant="filled"
        radius={"lg"}
        style={{ position: "fixed", right: 20, bottom: 20, zIndex: 1000 }}
      >
        新規登録
      </Button>
    </NavLink>
  );
};
