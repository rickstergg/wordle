export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}

export const isLetter = (keyCode: number) => {
  return (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) ? true : false
}

export const isDelete = (keyCode: number) => {
  return keyCode === 8;
}

export const isEnter = (keyCode: number) => {
  return keyCode === 13;
}

export const evaluate = (magicWord: string, word: string) => {
  const map = {};

  return word.split('').map((letter, index) => {
    if (!magicWord.includes(letter)) {
      return 'absent';
    } else if (magicWord[index] === word[index]) {
      return 'correct';
    } else {
      // Check for already accounted for characters, if something matches or is present with another character, delete it
      return 'present';
    }
  });
}
