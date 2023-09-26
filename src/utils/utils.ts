import { Dictionary } from "../types";

export enum Evaluation {
  ABSENT = 'ABSENT',
  CORRECT = 'CORRECT',
  PRESENT = 'PRESENT',
  PENDING = 'PENDING',
};

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}

export const isLetter = (keyCode: number) => {
  return (keyCode >= 65 && keyCode <= 90) ? true : false
}

export const isDelete = (keyCode: number) => {
  return keyCode === 8;
}

export const isEnter = (keyCode: number) => {
  return keyCode === 13;
}

export const removeCharAtIndex = (word: string, index: number) => {
  return word.slice(0, index) + word.slice(index + 1);
}

export const getRandomWord = (dictionary: Dictionary): string => {
  const words = Object.values(dictionary);
  return words[getRandomInt(words.length - 1)];
}

export const evaluate = (magicWord: string, word: string): Evaluation[] => {
  let pendingChars = magicWord;
  let evaluations = Array(magicWord.length).fill('');

  for (let index = magicWord.length - 1; index >= 0; index--) {
    if (!magicWord.includes(magicWord[index])) {
      evaluations[index] = Evaluation.ABSENT;
    } else if (magicWord[index] === word[index]) {
      pendingChars = removeCharAtIndex(pendingChars, index);
      evaluations[index] = Evaluation.CORRECT;
    } else {
      evaluations[index] = Evaluation.PENDING;
    }
  }

  evaluations.forEach((evaluation, index) => {
    if (evaluation === Evaluation.PENDING) {
      const position = pendingChars.indexOf(word[index]);
      if (position !== -1) {
        pendingChars = removeCharAtIndex(pendingChars, position);
        evaluations[index] = Evaluation.PRESENT;
      } else {
        evaluations[index] = Evaluation.ABSENT;
      }
    }
  });

  return evaluations;
}

// Any correct letters should be immediately cancelled out
// Take any remaining characters in previousGuess that are 'present'
// Make sure they exist in the remaining currentGuess and cancel them out.
export const findHintError = (magicWord: string, previousGuess: string, currentGuess: string): string => {
  if (!previousGuess?.length) {
    return '';
  }

  // TODO: Store Evaluations and pass them in instead of re-calculating
  const evaluations = evaluate(magicWord, previousGuess);

  const requiredLetters = [];
  let index = previousGuess.length - 1;
  while(index >= 0) {
    if (evaluations[index] === Evaluation.CORRECT) {
      if (previousGuess[index] === currentGuess[index]) {
        previousGuess = removeCharAtIndex(previousGuess, index);
        currentGuess = removeCharAtIndex(currentGuess, index);
      } else {
        return `Character at position ${index + 1} must be ${magicWord[index].toUpperCase()}`;
      }
    } else if (evaluations[index] === Evaluation.PRESENT) {
      requiredLetters.push(previousGuess[index]);
    }
    index -= 1;
  }

  const error = assertRemainingCharacters(requiredLetters, currentGuess);
  return error.length ? error : '';
}

export const assertRemainingCharacters = (characters: string[], currentGuess: string): string => {
  let index = 0;
  while (index < characters.length) {
    const position = currentGuess.indexOf(characters[index]);
    if (position !== -1) {
      currentGuess = removeCharAtIndex(currentGuess, position);
    } else {
      return `Character '${characters[index].toUpperCase()}' from previous guess not in ${currentGuess}.`;
    }
    index += 1;
  }

  return '';
}
