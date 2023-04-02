import { Cell } from "./components/Cell";
import {Player, Position} from "./hooks/usePlayer"

// constants
export const BOARD_WIDTH: number = 6;
export const BOARD_HEIGHT: number = 8;

export const checkCollision = (player: Player, stage: Cell[][], { x: moveX, y: moveY }: Position) => {
  for (let y = 0; y < player.piece.length; y += 1) {
    for (let x = 0; x < player.piece[y].length; x += 1) {
      // 1. Check that we're on a letter cell
      if (player.piece[y][x] !== "") {
        if (
        // 2. Check that move is within game board height (y)
        // we shouldn't go through the bottom of the board
        !stage[y + player.position.y + moveY] || 
        // 4. Check that the cell we're moving to is set to clear
        !stage[y + player.position.y + moveY][x + player.position.x + moveX] ||
          stage[y + player.position.y + moveY][x + player.position.x + moveX].type !== 'empty'
        ) {
          return true;
        }
        // 3. Check that move is within game board width (x)
      }
    }
  }
};
