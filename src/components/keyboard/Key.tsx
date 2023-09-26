import { Button } from "@mui/material";
import { KeyProps } from "../../types";

export const Key = ({ value, status, onClick }: KeyProps) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (_) => {
    onClick(value);
  };

  return (
    <Button
      className={status?.toLowerCase() ?? "unguessed-key"}
      sx={{
        cursor: "pointer",
        color: "#ffffff",
        fontWeight: 700,
      }}
      onClick={handleClick}
    >
      {value}
    </Button>
  );
};
