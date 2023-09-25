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

export const removeCharAtIndex = (word: string, index: number) => {
  return word.slice(0, index) + word.slice(index + 1);
}

export const evaluate = (magicWord: string, word: string): string[] => {
  let magicWordDuplicate = magicWord;
  let evaluations = new Array(magicWord.length).fill('');

  for (let index = magicWord.length - 1; index >= 0; index--) {
    if (!magicWord.includes(magicWord[index])) {
      evaluations[index] = 'absent';
    } else if (magicWord[index] === word[index]) {
      magicWordDuplicate = removeCharAtIndex(magicWordDuplicate, index);
      evaluations[index] = 'correct';
    } else {
      evaluations[index] = 'pending';
    }
  }

  evaluations.forEach((evaluation, index) => {
    if (evaluation === 'pending') {
      const position = magicWordDuplicate.indexOf(word[index]);
      if (position !== -1) {
        magicWordDuplicate = removeCharAtIndex(magicWordDuplicate, position);
        evaluations[index] = 'present';
      } else {
        evaluations[index] = 'absent';
      }
    }
  });

  return evaluations;
}
