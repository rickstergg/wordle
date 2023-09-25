import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";
import { EvaluatedRow } from "./EvaluatedRow";
import { GuessGridProps } from "../../types";

export const GuessGrid = ({
  magicWord,
  currentIndex,
  guesses,
}: GuessGridProps) => {
  return (
    <>
      {guesses.map((guess, rowIndex) => {
        if (rowIndex < currentIndex) {
          return (
            <EvaluatedRow
              key={rowIndex}
              row={rowIndex}
              magicWord={magicWord}
              word={guess}
            />
          );
        } else if (rowIndex === currentIndex) {
          return (
            <CurrentRow
              key={rowIndex}
              row={rowIndex}
              size={magicWord.length}
              word={guesses[currentIndex]}
            />
          );
        } else {
          return (
            <EmptyRow key={rowIndex} row={rowIndex} size={magicWord.length} />
          );
        }
      })}
    </>
  );
};
