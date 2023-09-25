import React, { useEffect, useState } from "react";
import "./App.css";
import { getRandomInt } from "./utils/utils";
import { Grid } from "./components/Grid";

const MAXIMUM_TRIES = 6;

function App() {
  const [wordList, setWordList] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [guesses, setGuesses] = useState<string[]>(
    new Array(MAXIMUM_TRIES).fill("")
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    let loaded = false;
    fetch("wordlist.txt")
      .then((r) => r.text())
      .then((text) => {
        if (!loaded) {
          const words = text.split("\n");
          setWordList(words);
          setCurrentWord(words[getRandomInt(words.length - 1)]);
          return;
        }
      })
      .catch((err) => setError(err));

    return () => {
      loaded = true;
    };
  }, []);

  const reset = () => {
    setGuesses(Array(MAXIMUM_TRIES).fill(""));
    setCurrentWord(wordList[getRandomInt(wordList.length - 1)]);
    setCurrentIndex(0);
  };

  console.log(guesses);

  return (
    <div className="App">
      {error && <>Something went wrong!</>}
      {currentWord && (
        <>
          <>
            Loaded {wordList.length} words, current word: {currentWord}
          </>
          {/* <input
            type="text"
            onSubmit={() => console.log("numbered guess")}
            maxLength={wordList.length.toString().length}
          /> */}
          <Grid
            magicWord={currentWord}
            maxTries={MAXIMUM_TRIES}
            guesses={guesses}
            setGuesses={setGuesses}
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
          />
        </>
      )}
      <button onClick={() => reset()}>Reset!</button>
    </div>
  );
}

export default App;
