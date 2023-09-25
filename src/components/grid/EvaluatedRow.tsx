import { EvaluatedRowProps } from "../../types";
import { evaluate } from "../../utils/utils";

export const EvaluatedRow = ({ magicWord, word, row }: EvaluatedRowProps) => {
  const evaluations = evaluate(magicWord, word);

  return (
    <div className="row">
      {word.split("").map((_, index) => {
        return (
          <div
            key={`row-${row}-index-${index}`}
            className={`letter-box ${
              word[index] ? "filled-in" : ""
            } ${evaluations[index]?.toLowerCase()}`}
          >
            {word[index]}
          </div>
        );
      })}
    </div>
  );
};
