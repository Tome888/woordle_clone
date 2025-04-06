import { useEffect, useState } from "react";
import SingleSquare from "./SingleSquare";

interface SquaresProps {
  theWord: string[];
  theGuess: string[];
  turn: {
    rowTurn: number;
    indexx: number;
  };
  winnerFunc: (cls: string) => void;

  restartGame: boolean;
}

function Squares({
  theWord,
  theGuess,
  turn,
  winnerFunc,
  restartGame,
}: SquaresProps) {
  const [rowGuess, setRowGuess] = useState<string[]>([]);

  useEffect(() => {
    if (turn.rowTurn === turn.indexx) setRowGuess([...theGuess]);
    // setRowGuess([]);
  }, [theGuess]);
  useEffect(() => {
    setRowGuess([]);
    console.log("the guess of the row has been reset");
  }, [restartGame]);

  const colorFunction = (
    index: number,
    setStateFunc: (theClass: string) => void
  ) => {
    const timer = index * 250;

    if (turn.rowTurn > turn.indexx) {
      if (rowGuess[index] === theWord[index]) {
        setTimeout(() => {
          setStateFunc("greenBg flip");
        }, timer);

        return;
      }

      if (theWord.includes(rowGuess[index])) {
        setTimeout(() => {
          setStateFunc("yellowBg flip");
        }, timer);

        return;
      }
    }
  };

  return (
    <div className={`line`}>
      {/* theWord:{theWord}
      {"    "}theGuess:{theGuess} */}

      {theWord.map((_, idx) => {
        return (
          <SingleSquare
            key={idx}
            letter={rowGuess[idx] && rowGuess[idx].toLocaleUpperCase()}
            indexx={idx}
            funcColor={colorFunction}
            resGame={restartGame}
          />
        );
      })}
    </div>
  );
}

export default Squares;
