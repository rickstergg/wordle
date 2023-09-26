import { Dispatch, SetStateAction } from "react";

export type GuessGridProps = {
  magicWord: string;
  currentIndex: number;
  guesses: string[];
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

export type KeyboardProps = {
  handleEnter: () => void;
  handleDelete: () => void;
  handleLetter: (key: string) => void;
};

export type KeyProps = {
  value: string;
  onClick: (value: string) => void;
};

export interface Dictionary {
    [key: number]: string
}
