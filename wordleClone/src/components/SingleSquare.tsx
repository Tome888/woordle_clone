import { useState } from "react";

interface SingleSquareProps {
  letter: string;
  indexx: number;

  funcColor: (
    indexx: number,
    setStateFunction: (theClass: string) => void
  ) => void;

  resGame: boolean;
}

function SingleSquare({ letter, funcColor, indexx }: SingleSquareProps) {
  const [classSquare, setClassSquare] = useState("");

  return (
    <div
      className={`sqaure ${funcColor(indexx, setClassSquare)} ${classSquare} `}
    >
      {letter}
    </div>
  );
}

export default SingleSquare;
