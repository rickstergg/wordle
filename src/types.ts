import { Dispatch, SetStateAction } from "react";
import { Evaluation } from "./utils/utils";

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
  statuses: StatusDictionary;
  handleEnter: () => void;
  handleDelete: () => void;
  handleLetter: (key: string) => void;
};

export type KeyProps = {
  status?: Evaluation;
  value: string;
  onClick: (value: string) => void;
};

export interface WordDictionary {
  [key: number]: string
}

export interface StatusDictionary {
  [key: string]: Evaluation;
}
