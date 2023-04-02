import { useCallback, useState } from "react";
import { BOARD_WIDTH, checkCollision } from "../gameHelpers";
import { Cell as CellType } from "../components/Cell";

export const randomPiece = () => {
  // Weighted assortment of letters
  const letters = "AAAAAABBBBCCCCDDDDDDEEEEEEEEFFFGGGGHHIIIIIIIIIJKKLLLLMNOOOOPPPQRRRRRSSSSTTTTTTUUUUVWWXYYYZ";
  const randPiece = [
    [letters[Math.floor(Math.random() * letters.length)], letters[Math.floor(Math.random() * letters.length)]],
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
    const initialPlayer = JSON.parse(JSON.stringify(player));
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    const isVertical = clonedPlayer.piece[0][0] === "" && clonedPlayer.piece[1][0] === ""
      || clonedPlayer.piece[0][1] === "" && clonedPlayer.piece[1][1] === "";

    if (clonedPlayer.piece[0][0] !== "" && dir === 1 && !isVertical) {
      clonedPlayer.position.x -= 1;
    }
    else if (clonedPlayer.piece[0][0] !== "" && dir === -1 && isVertical) {
      clonedPlayer.position.x -= 1;
    }
    else if (clonedPlayer.piece[0][0] !== "" && dir === -1 && !isVertical) {
      clonedPlayer.position.y -= 1;
    }
    else if (clonedPlayer.piece[0][0] === "" && dir === 1 && isVertical) {
      clonedPlayer.position.y -= 1;
    }
    else if (clonedPlayer.piece[0][0] !== "" && dir === 1 && isVertical) {
      clonedPlayer.position.y += 1;
    }
    else if (clonedPlayer.piece[0][0] === "" && dir === 1 && !isVertical) {
      clonedPlayer.position.x += 1;
    }
    else if (clonedPlayer.piece[0][0] === "" && dir === -1 && isVertical) {
      clonedPlayer.position.x += 1;
    }
    else if (clonedPlayer.piece[0][0] === "" && dir === -1 && !isVertical) {
      clonedPlayer.position.y += 1;
    }

    clonedPlayer.piece = rotate(clonedPlayer.piece, dir);
    setPlayer(clonedPlayer);
    if (checkCollision(clonedPlayer, stage, {x: 0, y: 0})) {
      setPlayer(initialPlayer);
    }
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
