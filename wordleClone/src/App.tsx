import { useEffect, useState } from "react";
import "./App.css";
import dataWords from "./assets/wordsData";
import DataProp from "./types/dataType";
import Squares from "./components/Squares";
import { IconButton } from "@mui/material";
import Keyboard from "./components/Keyboard";
import ConfettiCelebration from "./components/ConfettiCelebration";

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
  const [fullDataWords, setFullDataWords] = useState<string[]>([]);
  const [foundWord, setFoundWord] = useState(true);

  const setGameWord = () => {
    if (!dataWords) return setGuessWord(null);

    setFullDataWords(dataWords[numOfLetters]);
    const randomNumber = Math.floor(
      Math.random() * dataWords[numOfLetters].length
    );
    const newWord = dataWords[numOfLetters][randomNumber];

    setGuessWord(newWord.split(""));
  };

  const checkIfInDb = () => {
    const toStrGuess = myGuess.join("");
    return fullDataWords.includes(toStrGuess);
  };
  useEffect(() => {
    console.log(guessWord, "WORD TO GUESS");
  }, [guessWord]);

  const typeFunc = (keyType: string) => {
    if (!guessWord) return;
    if (didWon) return;
    if (keyType === "ENTER" && guessWord.length === myGuess.length) {
      setRowTurn(rowTurn + 1);
      setGuess([]);
      setDidWon(checkIfWinner(guessWord, myGuess, numTrys, rowTurn));
      return;
    }

    if (keyType === "⇍") {
      setGuess(myGuess.slice(0, -1));
      return;
    }

    if (
      keyType !== "⇍" &&
      keyType !== "ENTER" &&
      guessWord.length > myGuess.length
    )
      setGuess((prevGuess) => [...prevGuess, keyType.toLocaleLowerCase()]);
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
    if (
      numberOfTrys.length === theTurn + 1 &&
      guessTheWordArr.every((value, index) => value !== myGuessArr[index])
    ) {
      return "loser";
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

  const handleChange = (newValue: number | null) => {
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
            className="settingsButton"
            onClick={() =>
              settings === ""
                ? rowTurn < 1 && setSettings("openSettings")
                : setSettings("")
            }
          >
            {settings ? "❌" : "⚙️"}
          </IconButton>

          {didWon && (
            <IconButton
              className="resetBtn"
              onClick={() => {
                setStartNewGame(!startNewGame);
              }}
            >
              🔄️
            </IconButton>
          )}
        </div>
        <h1>Wordle-Clone</h1>
      </nav>
      {settings && (
        <div
          onClick={() => {
            settings === "" ? setSettings("openSettings") : setSettings("");
          }}
          className="mobilePopup"
        ></div>
      )}
      <div className={`${settings} settingsDropdown`}>
        {settings && (
          <div className="bgDropdown">
            <div className="selectOptions">
              <p>Number Of Try's:</p>

              <button
                className={theValue === 4 ? "activeOption" : ""}
                onClick={() => handleChange(4)}
              >
                4
              </button>
              <button
                className={theValue === 5 ? "activeOption" : ""}
                onClick={() => handleChange(5)}
              >
                5
              </button>
              <button
                className={theValue === 6 ? "activeOption" : ""}
                onClick={() => handleChange(6)}
              >
                6
              </button>
            </div>
            <div className="selectOptions">
              <p>Number Of Letters:</p>

              <button
                className={
                  numOfLetters === "fourLetterWords" ? "activeOption" : ""
                }
                onClick={() => setNumOfLetters("fourLetterWords")}
              >
                4
              </button>
              <button
                className={
                  numOfLetters === "fiveLetterWords" ? "activeOption" : ""
                }
                onClick={() => setNumOfLetters("fiveLetterWords")}
              >
                5
              </button>
              <button
                className={
                  numOfLetters === "sixLetterWords" ? "activeOption" : ""
                }
                onClick={() => setNumOfLetters("sixLetterWords")}
              >
                6
              </button>
            </div>
          </div>
        )}
      </div>

      {/* <h1>My Guess- {myGuess}</h1> */}
      {/* <h2>{guessWord}</h2> */}
      <div className="gameInfoCointainer">
        <h2>{didWon && `The word is: ${guessWord && guessWord.join("")}`}</h2>
        {/* <h2>{didWon === "winner" && "WIN!"}</h2> */}
        {didWon === "winner" && <h2 className="winHtwo">WIN!</h2>}

        {didWon === "loser" && <h2 className="loseHtwo">Lose ☹️</h2>}
      </div>

      <div className="gameHolder">
        <div>
          {guessWord &&
            numTrys.map((_, idx) => {
              return (
                <Squares
                  theWord={guessWord}
                  theGuess={idx === rowTurn ? myGuess : []}
                  key={`${startNewGame}-${idx}`}
                  turn={{ rowTurn, indexx: idx }}
                  winnerFunc={setDidWon}
                  restartGame={startNewGame}
                />
              );
            })}
        </div>
        <Keyboard letterFunc={typeFunc} />
      </div>
      <ConfettiCelebration winner={didWon} />
    </>
  );
}

export default App;
