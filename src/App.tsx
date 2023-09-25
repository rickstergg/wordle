import React, { useEffect, useState } from "react";
import "./App.css";
import { getRandomWord } from "./utils/utils";
import { GuessGrid } from "./components/grid/GuessGrid";
import { Dictionary } from "./types";
import { LineNumberForm } from "./components/LineNumberForm";
import { Button, Grid } from "@mui/material";

const MAXIMUM_TRIES = 6;

function App() {
  const [wordDictionary, setWordDictionary] = useState<Dictionary>({});
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [currentWord, setCurrentWord] = useState<string>("");
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
          setCurrentWord(getRandomWord(dictionary));
        }
      })
      .catch((err) => setError(err));

    return () => {
      loaded = true;
    };
  }, []);

  const reset = () => {
    setGuesses(Array(MAXIMUM_TRIES).fill(""));
    setCurrentWord(getRandomWord(wordDictionary));
    setCurrentIndex(0);
    setGameOver(false);
  };

  const handleLineNumber = (lineNumber: number) => {
    let word = wordDictionary[lineNumber];
    setGuesses((prev) => {
      const newGuesses = [...prev];
      if (currentWord.length < word.length) {
        word = word.slice(0, currentWord.length);
      }
      newGuesses[currentIndex] = word;
      return newGuesses;
    });
  };

  return (
    <div className="App">
      {error && <>Something went wrong!</>}
      {currentWord && (
        <Grid
          container
          direction="column"
          alignItems={"center"}
          justifyContent={"center"}
          spacing={4}
        >
          <Grid item>
            <>Loaded words, current word: {currentWord}</>
          </Grid>
          <Grid item>
            <LineNumberForm
              max={Object.values(wordDictionary).length}
              handleLineNumber={handleLineNumber}
            />
          </Grid>
          <Grid item>
            <GuessGrid
              dictionary={wordDictionary}
              magicWord={currentWord}
              maxTries={MAXIMUM_TRIES}
              guesses={guesses}
              gameOver={gameOver}
              setGameOver={setGameOver}
              setGuesses={setGuesses}
              setCurrentIndex={setCurrentIndex}
              currentIndex={currentIndex}
            />
          </Grid>
        </Grid>
      )}
      <Button onClick={() => reset()}>Reset!</Button>
    </div>
  );
}

export default App;
