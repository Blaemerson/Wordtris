import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Cell as CellType } from "../components/Cell";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../gameHelpers";
import { Player } from "./usePlayer";

export const createStage = () => {
  const stage: CellType[][] = Array.from(Array(BOARD_HEIGHT), () =>
    new Array(BOARD_WIDTH).fill(0).map((_) => ({ letter: "", type: "empty" }))
  );
  return stage;
};

export const useStage = (
  player: Player,
  resetPlayer: () => void
): [CellType[][], Dispatch<SetStateAction<CellType[][]>>] => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  const sweepRows = (newStage: CellType[][]) =>
    newStage.reduce((acc: CellType[][], row: CellType[]) => {
      if (row.findIndex((cell) => cell.letter === "") === -1) {
        setRowsCleared((prev) => prev + 1);
        acc.unshift(
          new Array(newStage[0].length).fill({
            letter: "",
            type: "empty",
          } as CellType)
        );
        return acc;
      }
      acc.push(row);
      return acc;
    }, []);

  useEffect(() => {
    setRowsCleared(0);
    const updateStage = (prevStage: CellType[][]) => {
      // First flush the stage
      const newStage = prevStage.map((row) =>
        row.map((cell) =>
          cell.type === "empty" ? { letter: "", type: "empty" } : cell
        )
      ) as CellType[][];

      // Then draw the block
      player.piece.forEach((row, y) => {
        row.forEach((letter, x) => {
          if (letter !== "") {
            newStage[y + player.position.y][x + player.position.x] = {
              letter: letter,
              type: `${player.collided ? "merged" : "empty"}`,
            };
          }
        });
      });

      // Then check if we collided
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage];
};
