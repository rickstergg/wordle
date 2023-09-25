import { useEffect } from "react";
import { isDelete, isEnter, isLetter } from "../../utils/utils";
import { KeyboardProps } from "../../types";
import { Key } from "./Key";
import { Grid } from "@mui/material";

export const Keyboard = ({
  gameOver,
  handleEnter,
  handleDelete,
  handleLetter,
}: KeyboardProps) => {
  useEffect(() => {
    const detectKeydown = (e: KeyboardEvent) => {
      if (gameOver) {
        return;
      }

      if (isEnter(e.keyCode)) {
        handleEnter();
      } else if (isDelete(e.keyCode)) {
        handleDelete();
      } else {
        if (isLetter(e.keyCode)) {
          handleLetter(e.key);
        }
      }
    };

    document.addEventListener("keydown", detectKeydown);

    return function cleanUp() {
      document.removeEventListener("keydown", detectKeydown);
    };
  }, [gameOver, handleEnter, handleDelete, handleLetter]);

  const onClick = (value: string) => {
    if (value === "enter") {
      handleEnter();
    } else if (value === "backspace") {
      handleDelete();
    } else {
      handleLetter(value);
    }
  };
  return (
    <Grid container direction={"column"}>
      <Grid container item spacing={1} justifyContent={"center"}>
        {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((key) => (
          <Grid item>
            <Key key={key} value={key} onClick={onClick} />
          </Grid>
        ))}
      </Grid>
      <Grid container item spacing={1} justifyContent={"center"}>
        {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((key) => (
          <Grid item>
            <Key key={key} value={key} onClick={onClick} />
          </Grid>
        ))}
      </Grid>
      <Grid container item spacing={1} justifyContent={"center"}>
        {["enter", "z", "x", "c", "v", "b", "n", "m"].map((key) => (
          <Grid item>
            <Key key={key} value={key} onClick={onClick} />
          </Grid>
        ))}
        <Grid item>
          <Key key={"backspace"} value={"backspace"} onClick={onClick}>
            ←
          </Key>
        </Grid>
      </Grid>
    </Grid>
  );
};
