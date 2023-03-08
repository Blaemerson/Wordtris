import React, { Dispatch, SetStateAction } from 'react';
import { useState, useEffect } from "react";

// constants
const BOARD_WIDTH: number = 6;
const BOARD_HEIGHT: number = 8;

// hooks
export const createStage = () => {
  const stage: Cell[][] = Array.from(Array(BOARD_HEIGHT), () =>
    new Array(BOARD_WIDTH).fill(0).map(_ => ({ letter: "", type: "empty" }))
  );
  return stage;
}

export const useStage = (): [Cell[][], Dispatch<SetStateAction<Cell[][]>>] => {
  const [stage, setStage] = useState(createStage());
  return [stage, setStage];
};

type Cell = {
  letter: string;
  type: string;
}

function Cell({ letter, type }: Cell) {
  return (<div className="cell"> {type} </div>);
}

type BoardProps = {
  stage: Cell[][];
}

function Board({ stage }: BoardProps) {
  return (
    <div className="center-screen">
      <div className="stage">
        {stage.map(row => row.map((cell, x) => <Cell key={x} letter={cell.letter} type={cell.type} />))}
      </div>
    </div>
  );
}

function App() {
  const [stage, setStage] = useStage();

  return (
    <div className="App">
      <h1>WORDTRIS</h1>
      <h2>Size: {BOARD_WIDTH} x {BOARD_HEIGHT}</h2>
      <Board stage={stage} />
    </div>
  );
}

export default App;
