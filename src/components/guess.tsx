type GuessProps = {
  size: number;
  word: string;
  evaluated: boolean;
  row: number;
};

export const Guess = ({ size, word, evaluated, row }: GuessProps) => {
  let letters = word.split("");

  if (letters.length < size) {
    letters = letters.concat([...new Array(size - letters.length).fill("")]);
  }

  return (
    <div>
      {letters.map((letter, index) => {
        return (
          <input
            key={`row-${row}-index-${index}`}
            type="text"
            readOnly
            className="letter-box"
            maxLength={1}
            value={word[index] ?? ""}
          />
        );
      })}
    </div>
  );
};
