import { Dispatch, SetStateAction } from "react";

export type GridProps = {
  magicWord: string;
  maxTries: number;
  gameOver: boolean;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  guesses: string[];
  setGuesses: Dispatch<SetStateAction<string[]>>;
};

export type EvaluatedRowProps = {
  magicWord: string;
  word: string;
  row: number;
};

export type CurrentRowProps = {
  word: string;
  row: number;
  size: number;
};

export type EmptyRowProps = {
  row: number;
  size: number;
};

export interface Dictionary {
    [key: number]: string
}
