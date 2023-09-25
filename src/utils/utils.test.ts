import { Evaluation, evaluate, getRandomInt, getRandomWord, isDelete, isEnter, isLetter, removeCharAtIndex } from "./utils";

describe("getRandomInt", () => {
  it('returns a number between 0 and the limit', () => {
    const number = getRandomInt(10);

    expect(number).toBeGreaterThanOrEqual(0);
    expect(number).toBeLessThanOrEqual(10);
  });
});

describe('removeCharAtIndex', () => {
  it('returns an empty string with an empty string', () => {
    expect(removeCharAtIndex('', 0)).toEqual('');
  });

  it('returns the same string when out of bounds', () => {
    expect(removeCharAtIndex('hades', -10)).toEqual('hades');
    expect(removeCharAtIndex('hades', 10)).toEqual('hades');
  });

  it('returns the string with char at index missing', () => {
    expect(removeCharAtIndex('rickster', 2)).toEqual('rikster');
  });
});

describe('getRandomWord', () =>{
  const dictionary = {
    1: 'hello',
    2: 'is',
    3: 'it',
    4: 'me',
    5: 'youre',
    6: 'looking',
    7: 'for',
  };

  it('returns a random word from the dictionary', () => {
    const word = getRandomWord(dictionary);
    expect(Object.values(dictionary)).toContain(word);
  });
});

describe('Keyboard Inputs', () => {
  describe('isLetter', () => {
    it('returns true with keyCode between 65 and 90', () => {
      expect(isLetter(69)).toBeTruthy();
    });

    it('returns false with keyCode not between 65 and 90', () => {
      expect(isLetter(0)).toBeFalsy();
    });
  });

  describe('isDelete', () => {
    it('returns true with keyCode 8', () => {
      expect(isDelete(8)).toBeTruthy();
    });

    it('returns false with keyCode not 8', () => {
      expect(isDelete(0)).toBeFalsy();
    });
  });

  describe('isEnter', () => {
    it('returns true with keyCode 13', () => {
      expect(isEnter(13)).toBeTruthy();
    });

    it('returns false with keyCode not 8', () => {
      expect(isEnter(0)).toBeFalsy();
    });
  });
});

describe('evaluate', () => {
  describe('with no matching characters', () => {
    it('should return absent evaluations', () => {
      const evaluations = evaluate('court', 'speak');
      evaluations.forEach(evaluation => {
        expect(evaluation).toBe(Evaluation.ABSENT);
      });
    });
  });

  describe('with all matching characters', () => {
    it('should return correct evaluations', () => {
      const evaluations = evaluate('tower', 'tower');
      evaluations.forEach(evaluation => {
        expect(evaluation).toBe(Evaluation.CORRECT);
      });
    });
  });

  describe('with partial matching characters', () => {
    describe('in a standard use-case', () => {
      it('should return present evaluations', () => {
        const evaluations = evaluate('coral', 'store');
        const expected = [
          Evaluation.ABSENT,
          Evaluation.ABSENT,
          Evaluation.PRESENT,
          Evaluation.PRESENT,
          Evaluation.ABSENT,
        ];

        evaluations.forEach((evaluation, index) => {
          expect(evaluation).toBe(expected[index]);
        });
      });
    });

    describe('in an anagram', () => {
      it('should return proper evaluations', () => {
        const evaluations = evaluate('tower', 'wrote');
        evaluations.forEach(evaluation => {
          expect(evaluation).toBe(Evaluation.PRESENT);
        });
      });
    });

    describe('in a magic word with repeated characters', () => {
      it('should return proper evaluations for [sweet, meets]', () => {
        const evaluations = evaluate('sweet', 'meets');
        const expected = [
          Evaluation.ABSENT,
          Evaluation.PRESENT,
          Evaluation.CORRECT,
          Evaluation.PRESENT,
          Evaluation.PRESENT,
        ];

        evaluations.forEach((evaluation, index) => {
          expect(evaluation).toBe(expected[index]);
        });
      });
    });

    describe('in a guess with repeated characters', () => {
      it('should return proper evaluations for [place, sweet]', () => {
        const evaluations = evaluate('place', 'sweet');
        const expected = [
          Evaluation.ABSENT,
          Evaluation.ABSENT,
          Evaluation.PRESENT,
          Evaluation.ABSENT,
          Evaluation.ABSENT,
        ];

        evaluations.forEach((evaluation, index) => {
          expect(evaluation).toBe(expected[index]);
        });
      });
    });

    describe('when both have repeated characters', () => {
      it('should return proper evaluations for [cools, drool]', () => {
        const evaluations = evaluate('cools', 'drool');
        const expected = [
          Evaluation.ABSENT,
          Evaluation.ABSENT,
          Evaluation.CORRECT,
          Evaluation.PRESENT,
          Evaluation.PRESENT,
        ];

        evaluations.forEach((evaluation, index) => {
          expect(evaluation).toBe(expected[index]);
        });
      });
    });
  });
});
