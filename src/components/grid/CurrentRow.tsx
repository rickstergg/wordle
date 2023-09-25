import { CurrentRowProps } from "../../types";

export const CurrentRow = ({ size, word, row }: CurrentRowProps) => {
  let letters = word.split("");

  if (letters.length < size) {
    letters = letters.concat([...Array(size - letters.length).fill("")]);
  }

  return (
    <div className="row">
      {letters.map((_, index) => {
        return (
          <div
            key={`row-${row}-index-${index}`}
            className={`letter-box ${word[index] ? "filled-in" : ""}`}
          >
            {word[index]}
          </div>
        );
      })}
    </div>
  );
};
