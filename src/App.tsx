import React, { useEffect, useState } from "react";
import "./App.css";
import { getRandomWord } from "./utils/utils";
import { GuessGrid } from "./components/grid/GuessGrid";
import { Dictionary } from "./types";
import { LineNumberForm } from "./components/LineNumberForm";
import { Button, Grid, Modal, Box } from "@mui/material";
import { Keyboard } from "./components/keyboard/Keyboard";

const MAXIMUM_TRIES = 6;

function App() {
  const [wordDictionary, setWordDictionary] = useState<Dictionary>({});
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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
    setModalOpen(false);
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
    if (gameOver) {
      return;
    }

    setGuesses((prev) => {
      const newGuesses = [...prev];
      newGuesses[currentIndex] = newGuesses[currentIndex].slice(0, -1);
      return newGuesses;
    });
  };

  const handleLetter = (letter: string) => {
    if (gameOver) {
      return;
    }

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
    if (gameOver) {
      return;
    }

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

    if (
      guesses.includes(magicWord) ||
      guesses.filter((guess) => guess.length > 0).length === MAXIMUM_TRIES
    ) {
      console.log("game is over!");
      setGameOver(true);
      setModalOpen(true);
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
      {modalOpen && (
        <Modal
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <Box sx={{ padding: 5, backgroundColor: "#3a3a3a" }}>
            {guesses.includes(magicWord) ? (
              <>You Win! Congrats!</>
            ) : (
              <>Better luck next time, the word was {magicWord}</>
            )}
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default App;
