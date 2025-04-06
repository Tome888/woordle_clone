import { useEffect, useState } from "react";

interface SingleSquareProps {
  letter: string;
  indexx: number;

  funcColor: (
    indexx: number,
    setStateFunction: (theClass: string) => void
  ) => void;

  resGame: boolean;
}

function SingleSquare({
  letter,
  funcColor,
  indexx,
  resGame,
}: // resGame,
SingleSquareProps) {
  const [classSquare, setClassSquare] = useState("");
  useEffect(() => {
    setClassSquare("");
    console.log("the bg color of the square has been reset");

    // funcColor(indexx, setClassSquare);
  }, [resGame]);
  return (
    <div
      className={`sqaure ${funcColor(indexx, setClassSquare)} ${classSquare} `}
    >
      {/* {rowGuess[idx] && rowGuess[idx].toLocaleUpperCase()} */}
      {letter}
    </div>
  );
}

export default SingleSquare;
