import { useEffect } from "react";
import { isDelete, isEnter, isLetter } from "../utils/utils";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";
import { EvaluatedRow } from "./EvaluatedRow";
import { GuessGridProps } from "../types";

export const GuessGrid = ({
  magicWord,
  maxTries,
  dictionary,
  gameOver,
  setGameOver,
  currentIndex,
  setCurrentIndex,
  guesses,
  setGuesses,
}: GuessGridProps) => {
  useEffect(() => {
    function detectKeydown(e: KeyboardEvent) {
      if (currentIndex === guesses.length || gameOver) {
        console.log("game should be over!");
        return;
      }

      const currentGuess = guesses[currentIndex];

      if (isLetter(e.keyCode)) {
        if (currentGuess.length < magicWord.length) {
          setGuesses((prev) => {
            const nextGuesses = [...prev];
            nextGuesses[currentIndex] += e.key;
            return nextGuesses;
          });
          return;
        }
      }

      if (isDelete(e.keyCode)) {
        if (currentGuess.length) {
          setGuesses((prev) => {
            const nextGuesses = [...prev];
            nextGuesses[currentIndex] = nextGuesses[currentIndex].slice(0, -1);
            return nextGuesses;
          });
          return;
        }
      }

      if (isEnter(e.keyCode)) {
        if (currentGuess.length === 0) {
          console.log("Guess cannot be empty!");
          return;
        }

        if (currentGuess.length !== magicWord.length) {
          // Guess must be same length!
          console.log("Guess must be same length as word!");
          return;
        }

        if (guesses.slice(0, currentIndex).includes(currentGuess)) {
          // Cannot guess the same word multiple times!
          console.log("Cannot guess an already guessed word!");
          return;
        }

        if (!Object.values(dictionary).includes(currentGuess)) {
          console.log("Guess must be a word in the dictionary!");
          return;
        }

        if (guesses.filter((guess) => guess.length > 0).length === maxTries) {
          // Game is over
          console.log("Game is over! Reset required.");
          return;
        }

        if (guesses.includes(magicWord)) {
          setGameOver(true);
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
  }, [
    dictionary,
    magicWord,
    maxTries,
    gameOver,
    setGameOver,
    currentIndex,
    setCurrentIndex,
    guesses,
    setGuesses,
  ]);

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
