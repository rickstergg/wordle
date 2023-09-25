import React, { useEffect, useState } from "react";
import "./App.css";
import { getRandomWord } from "./utils/utils";
import { Grid } from "./components/Grid";
import { Dictionary } from "./types";

const MAXIMUM_TRIES = 6;

function App() {
  const [wordDictionary, setWordDictionary] = useState({});
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

  return (
    <div className="App">
      {error && <>Something went wrong!</>}
      {currentWord && (
        <>
          <>Loaded words, current word: {currentWord}</>
          <input type="text" maxLength={currentWord.toString().length} />
          <button onClick={() => console.log("clicked")}>Input Guess</button>
          <Grid
            magicWord={currentWord}
            maxTries={MAXIMUM_TRIES}
            guesses={guesses}
            gameOver={gameOver}
            setGameOver={setGameOver}
            setGuesses={setGuesses}
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
          />
        </>
      )}
      <div onClick={() => reset()}>Reset!</div>
    </div>
  );
}

export default App;
