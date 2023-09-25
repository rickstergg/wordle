import React, { useEffect, useState } from "react";
import "./App.css";
import { getRandomWord } from "./utils/utils";
import { GuessGrid } from "./components/grid/GuessGrid";
import { Dictionary } from "./types";
import { LineNumberForm } from "./components/LineNumberForm";
import { Button, Grid } from "@mui/material";
import { Keyboard } from "./components/keyboard/Keyboard";

const MAXIMUM_TRIES = 6;

function App() {
  const [wordDictionary, setWordDictionary] = useState<Dictionary>({});
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [magicWord, setMagicWord] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>(
    Array(MAXIMUM_TRIES).fill("")
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    let loaded = false;
    fetch("wordlist.txt")
      .then((r) => r.text())
      .then((text) => {
        if (!loaded) {
          const dictionary: Dictionary = {};
          text.split("\n").forEach((word, index) => {
            dictionary[index] = word;
          });
          setWordDictionary(dictionary);
          setMagicWord(getRandomWord(dictionary));
        }
      })
      .catch((err) => setError(err));

    return () => {
      loaded = true;
    };
  }, []);

  const reset = () => {
    setGuesses(Array(MAXIMUM_TRIES).fill(""));
    setMagicWord(getRandomWord(wordDictionary));
    setCurrentIndex(0);
    setGameOver(false);
  };

  const handleLineNumber = (lineNumber: number) => {
    let word = wordDictionary[lineNumber];
    setGuesses((prev) => {
      const newGuesses = [...prev];
      if (magicWord.length < word.length) {
        word = word.slice(0, magicWord.length);
      }
      newGuesses[currentIndex] = word;
      return newGuesses;
    });
  };

  const handleDelete = () => {
    setGuesses((prev) => {
      const newGuesses = [...prev];
      newGuesses[currentIndex] = newGuesses[currentIndex].slice(0, -1);
      return newGuesses;
    });
  };

  const handleLetter = (letter: string) => {
    if (guesses[currentIndex].length < magicWord.length) {
      setGuesses((prev) => {
        const nextGuesses = [...prev];
        nextGuesses[currentIndex] += letter;
        return nextGuesses;
      });
      return;
    }
  };

  const handleEnter = () => {
    const currentGuess = guesses[currentIndex];
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

    if (!Object.values(wordDictionary).includes(currentGuess)) {
      console.log("Guess must be a word in the dictionary!");
      return;
    }

    if (guesses.filter((guess) => guess.length > 0).length === MAXIMUM_TRIES) {
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
  };

  return (
    <div className="App">
      {error && <>Something went wrong!</>}
      {magicWord && (
        <Grid
          container
          direction="column"
          alignItems={"center"}
          justifyContent={"center"}
          spacing={4}
        >
          <Grid item>
            <>Loaded words, current word: {magicWord}</>
          </Grid>
          <Grid item>
            <LineNumberForm
              handleLineNumber={handleLineNumber}
              max={Object.values(wordDictionary).length}
            />
          </Grid>
          <Grid item>
            <GuessGrid
              magicWord={magicWord}
              guesses={guesses}
              currentIndex={currentIndex}
            />
          </Grid>
          <Grid item>
            <Keyboard
              gameOver={gameOver}
              handleDelete={handleDelete}
              handleEnter={handleEnter}
              handleLetter={handleLetter}
            />
          </Grid>
        </Grid>
      )}
      <Grid>
        <Button color={"error"} variant={"contained"} onClick={() => reset()}>
          Reset!
        </Button>
      </Grid>
    </div>
  );
}

export default App;
