import React, { useEffect, useState } from "react";
import "./App.css";
import { getRandomInt } from "./utils/utils";

function App() {
  const [wordList, setWordList] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    loadWordList().then(() => {
      const newWord = wordList[getRandomInt(wordList.length - 1)];
      setCurrentWord(newWord);
    });
  }, [wordList.length]);

  const loadWordList = async () => {
    return await fetch("wordlist.txt")
      .then((r) => r.text())
      .then((text) => setWordList(text.split("\n")))
      .catch((err) => setError(err));
  };

  return <div className="App">{currentWord}</div>;
}

export default App;
