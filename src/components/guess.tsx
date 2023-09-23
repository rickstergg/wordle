import { useEffect, useState } from "react";
import { evaluate } from "../utils/utils";

type GuessProps = {
  magicWord: string;
  word: string;
  evaluated: boolean;
  row: number;
};

export const Guess = ({ magicWord, word, evaluated, row }: GuessProps) => {
  const [evaluations, setEvaluations] = useState<string[]>([]);

  useEffect(() => {
    setEvaluations(evaluate(magicWord, word));
  }, [evaluated]);

  let letters = word.split("");

  if (letters.length < magicWord.length) {
    letters = letters.concat([
      ...new Array(magicWord.length - letters.length).fill(""),
    ]);
  }

  return (
    <div className="row">
      {letters.map((_, index) => {
        return (
          <div
            key={`row-${row}-index-${index}`}
            className={`letter-box ${word[index] ? "filled-in" : ""} ${
              evaluated ? evaluations[index] : ""
            }`}
          >
            {word[index] ?? ""}
          </div>
        );
      })}
    </div>
  );
};
