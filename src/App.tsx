import React, { useEffect, useState } from "react";
import "./App.css";
import { getRandomWord } from "./utils/utils";
import { GuessGrid } from "./components/grid/GuessGrid";
import { Dictionary } from "./types";
import { LineNumberForm } from "./components/LineNumberForm";
import {
  Button,
  Grid,
  Modal,
  Box,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { Keyboard } from "./components/keyboard/Keyboard";
import { useSnackbar } from "notistack";
import { PinkSwitch } from "./components/PinkSwitch";

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
  const [hardMode, setHardMode] = useState<boolean>(false);
  const [cheats, setCheats] = useState<boolean>(true); // For testing
  const { enqueueSnackbar } = useSnackbar();

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
      return;
    }

    if (currentGuess.length !== magicWord.length) {
      enqueueSnackbar("Guess must be same length as the magic word.", {
        variant: "error",
      });
      return;
    }

    if (guesses.slice(0, currentIndex).includes(currentGuess)) {
      enqueueSnackbar(`${currentGuess} was already guessed.`, {
        variant: "error",
      });
      return;
    }

    if (!Object.values(wordDictionary).includes(currentGuess)) {
      enqueueSnackbar(
        `${currentGuess} does not exist in the dictionary at /wordlist.txt.`,
        {
          variant: "error",
        }
      );
      return;
    }

    if (
      guesses.includes(magicWord) ||
      guesses.filter((guess) => guess.length > 0).length === MAXIMUM_TRIES
    ) {
      setGameOver(true);
      setModalOpen(true);
    }

    setCurrentIndex((prev) => {
      prev += 1;
      return prev;
    });
  };

  const handleHardModeToggle = () => {
    setHardMode(!hardMode);
  };

  const handleCheatToggle = () => {
    setCheats(!cheats);
  };

  return (
    <div className="App">
      {error && <>Something went wrong!</>}
      {cheats && (
        <Grid
          container
          direction="column"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid item>Current magic word: {magicWord}</Grid>
        </Grid>
      )}
      {magicWord && (
        <Grid
          container
          direction="column"
          alignItems={"center"}
          justifyContent={"center"}
          spacing={4}
        >
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
          }}
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
      <FormGroup
        sx={{
          position: "absolute",
          top: 0,
          right: 20,
        }}
      >
        <FormControlLabel
          control={<PinkSwitch onChange={() => handleHardModeToggle()} />}
          label="Hard Mode?"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <PinkSwitch defaultChecked onChange={() => handleCheatToggle()} />
          }
          label="Cheats? ;)"
          labelPlacement="start"
        />
      </FormGroup>
    </div>
  );
}

export default App;
