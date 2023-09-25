import { Button } from "@mui/material";
import { KeyProps } from "../../types";

export const Key = ({ children, value, onClick }: KeyProps) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (_) => {
    onClick(value);
  };

  return (
    <Button
      sx={{
        cursor: "pointer",
        backgroundColor: "#818384",
        color: "#ffffff",
        fontWeight: 700,
      }}
      onClick={handleClick}
    >
      {children || value}
    </Button>
  );
};
