import { use, useEffect, useState } from "react";
import "./App.css";
import dataWords from "./assets/wordsData";
import DataProp from "./types/dataType";
import Squares from "./components/Squares";
import {
  Button,
  Drawer,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

function App() {
  const [settings, setSettings] = useState("");
  const [theValue, setTheValue] = useState(6);
  const [guessWord, setGuessWord] = useState<string[] | null>(null);
  const [rowTurn, setRowTurn] = useState(0);
  const [numTrys, setNumTrys] = useState(new Array(6).fill(""));
  const [numOfLetters, setNumOfLetters] =
    useState<keyof DataProp>("fiveLetterWords");
  const [myGuess, setGuess] = useState<string[]>([]);

  const [didWon, setDidWon] = useState("");
  const [startNewGame, setStartNewGame] = useState(false);

  const setGameWord = () => {
    if (!dataWords) return setGuessWord(null);

    const randomNumber = Math.floor(
      Math.random() * dataWords[numOfLetters].length
    );
    const newWord = dataWords[numOfLetters][randomNumber];

    setGuessWord(newWord.split(""));
  };

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (!guessWord) return new Error("Word to guess is not defined");
      if (didWon === "winner") return;

      if (numTrys.length <= rowTurn) return;
      if (
        /^[a-zA-Z]$/.test(e.key) ||
        e.key === "Enter" ||
        e.key === "Backspace"
      ) {
        if (e.key === "Backspace") {
          return setGuess(myGuess.slice(0, -1));
        }

        if (e.key === "Enter" && guessWord.length === myGuess.length) {
          setRowTurn(rowTurn + 1);
          setGuess([]);
          setDidWon(checkIfWinner(guessWord, myGuess, numTrys, rowTurn));
        }

        if (guessWord.length > myGuess.length) {
          if (e.key === "Enter") {
            return;
          }
          setGuess((prevGuess) => [...prevGuess, e.key.toLocaleLowerCase()]);
        }
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [myGuess, guessWord]);

  useEffect(() => {
    setGuess([]);
    setGuessWord(null);
    setGameWord();
    setRowTurn(0);
    setDidWon("");
    console.log(guessWord);
  }, [numOfLetters, startNewGame]);

  const checkIfWinner = (
    guessTheWordArr: string[],
    myGuessArr: string[],
    numberOfTrys: string[],
    theTurn: number
  ) => {
    if (numberOfTrys.length === theTurn + 1) {
      return "looser";
    }
    if (guessTheWordArr.every((value, index) => value === myGuessArr[index])) {
      return "winner";
    } else {
      return "";
    }
  };
  useEffect(() => {
    console.log(numTrys.length, rowTurn);
  }, [rowTurn]);

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: number | null
  ) => {
    if (newValue !== null) {
      setTheValue(newValue);
      setNumTrys(new Array(newValue).fill(""));
    }
  };
  return (
    <>
      <nav>
        <div>
          <IconButton
            color="primary"
            onClick={() =>
              settings === ""
                ? rowTurn < 1 && setSettings("openSettings")
                : setSettings("")
            }
          >
            ⚙️
          </IconButton>

          <Button
            onClick={() => setStartNewGame(!startNewGame)}
            variant="outlined"
          >
            Play Again
          </Button>
        </div>
        <h1>Wordle-Clone</h1>
      </nav>
      <div className={`${settings} settingsDropdown`}>
        {settings && (
          <div className="bgDropdown">
            <div className="selectOptions">
              <p>Trys:</p>
              <ToggleButtonGroup
                color="primary"
                value={theValue}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton value={4}>4</ToggleButton>
                <ToggleButton value={5}>5</ToggleButton>
                <ToggleButton value={6}>6</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
        )}
      </div>

      <h1>My Guess- {myGuess}</h1>
      <h2>Word to Guess- {guessWord}</h2>
      <h2>{didWon}</h2>
      {guessWord &&
        numTrys.map((_, idx) => {
          return (
            <Squares
              theWord={guessWord}
              theGuess={idx === rowTurn ? myGuess : []}
              key={idx}
              turn={{ rowTurn, indexx: idx }}
              winnerFunc={setDidWon}
              restartGame={startNewGame}
            />
          );
        })}
    </>
  );
}

export default App;
