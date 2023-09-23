import { useEffect, useState } from "react";
import { isDelete, isEnter, isLetter } from "../utils/utils";
import { Guess } from "./guess";

type GridProps = {
  magicWord: string;
};

const MAXIMUM_TRIES = 6;

export const Grid = ({ magicWord }: GridProps) => {
  const [guesses, setGuesses] = useState<string[]>(
    new Array(MAXIMUM_TRIES).fill("")
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    function detectKeydown(e: KeyboardEvent) {
      if (currentIndex == MAXIMUM_TRIES) {
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

        if (
          guesses.filter((guess) => guess.length > 0).length === MAXIMUM_TRIES
        ) {
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
            <Guess
              key={rowIndex}
              row={rowIndex}
              magicWord={magicWord}
              word={guess}
              evaluated
            />
          );
        } else if (rowIndex === currentIndex) {
          return (
            <Guess
              key={rowIndex}
              row={rowIndex}
              magicWord={magicWord}
              word={guesses[currentIndex]}
              evaluated={false}
            />
          );
        } else {
          return (
            <Guess
              key={rowIndex}
              row={rowIndex}
              magicWord={magicWord}
              word={guess}
              evaluated={false}
            />
          );
        }
      })}
    </>
  );
};
