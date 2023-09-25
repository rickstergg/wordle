import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { isDelete, isEnter, isLetter } from "../utils/utils";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";
import { EvaluatedRow } from "./EvaluatedRow";

type GridProps = {
  magicWord: string;
  guesses: string[];
  maxTries: number;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  setGuesses: Dispatch<SetStateAction<string[]>>;
};

export const Grid = ({
  magicWord,
  maxTries,
  currentIndex,
  setCurrentIndex,
  guesses,
  setGuesses,
}: GridProps) => {
  useEffect(() => {
    function detectKeydown(e: KeyboardEvent) {
      if (currentIndex == guesses.length) {
        console.log("game should be over!");
        return;
      }

      if (isLetter(e.keyCode)) {
        if (guesses[currentIndex].length < magicWord.length) {
          setGuesses((prev) => {
            const nextGuesses = [...prev];
            nextGuesses[currentIndex] += e.key;
            return nextGuesses;
          });
          return;
        }
      }

      if (isDelete(e.keyCode)) {
        if (guesses[currentIndex].length) {
          setGuesses((prev) => {
            const nextGuesses = [...prev];
            nextGuesses[currentIndex] = nextGuesses[currentIndex].slice(0, -1);
            return nextGuesses;
          });
          return;
        }
      }

      if (isEnter(e.keyCode)) {
        if (guesses[currentIndex].length !== magicWord.length) {
          // Guess must be same length!
          console.log("Guess must be same length as word!");
          return;
        }

        if (guesses.slice(0, currentIndex).includes(guesses[currentIndex])) {
          // Cannot guess the same word multiple times!
          console.log("Cannot guess an already guessed word!");
          return;
        }

        if (guesses.filter((guess) => guess.length > 0).length === maxTries) {
          // Game is over
          console.log("Game is over! Reset required.");
        }

        setCurrentIndex((prev) => {
          prev += 1;
          return prev;
        });
      }
    }

    document.addEventListener("keydown", detectKeydown);

    return function cleanUp() {
      document.removeEventListener("keydown", detectKeydown);
    };
  }, [guesses, currentIndex, magicWord]);

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
