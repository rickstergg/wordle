import { evaluate } from "../utils/utils";

type EvaluatedRowProps = {
  magicWord: string;
  word: string;
  row: number;
};

export const EvaluatedRow = ({ magicWord, word, row }: EvaluatedRowProps) => {
  const evaluations = evaluate(magicWord, word);

  return (
    <div className="row">
      {word.split("").map((_, index) => {
        return (
          <div
            key={`row-${row}-index-${index}`}
            className={`letter-box ${word[index] ? "filled-in" : ""} ${
              evaluations[index]
            }`}
          >
            {word[index]}
          </div>
        );
      })}
    </div>
  );
};
