import { useCallback, useState } from "react";
import { BOARD_WIDTH } from "../gameHelpers";
import { Cell as CellType } from "../components/Cell";

export const randomPiece = () => {

  const consonants = "BCDFGHKLMNPQRSTVWXYZ";
  const vowels = "AEIOU";
  const randPiece = [
    [consonants[Math.floor(Math.random() * consonants.length)], vowels[Math.floor(Math.random() * vowels.length)]],
    ["", ""]
  ]
  return randPiece;
}

type UpdatePlayerProps = {
  x: number;
  y: number;
  collided: boolean;
};

export type Position = {
  x: number;
  y: number;
};

export type Player = {
  position: Position;
  piece: string[][];
  collided: boolean;
};

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    position: { x: BOARD_WIDTH / 2 - 1, y: 0 },
    piece: randomPiece(),
    collided: false,
  } as Player);

  const rotate = (matrix: string[][], dir: number) => {
    // Make the rows become columns (transpose)
    const rotatedPiece = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    );
    // Reverse each row to get a rotated matrix
    if (dir > 0) return rotatedPiece.map((row) => row.reverse());

    return rotatedPiece.reverse();
  };

  const playerRotate = (stage: CellType[][], dir: number) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player)) as Player;
    clonedPlayer.piece = rotate(clonedPlayer.piece, dir);
    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }: UpdatePlayerProps) => {
    setPlayer((prev) => {
      const newPlayer: Player = {
        piece: prev.piece,
        position: { x: prev.position.x + x, y: prev.position.y + y },
        collided,
      };
      return newPlayer;
    });
  };

  const resetPlayer = useCallback(() => {
    const newPlayer: Player = {
      position: { x: BOARD_WIDTH / 2 - 1, y: 0 },
      piece: randomPiece(),
      collided: false,
    };
    setPlayer(newPlayer);
  }, []);

  return [player, resetPlayer, updatePlayerPos, playerRotate] as const;
};
