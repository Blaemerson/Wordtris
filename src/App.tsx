import { KeyboardEventHandler, useState } from "react";
import { Board } from "./components/Board";
import { BOARD_HEIGHT, BOARD_WIDTH, checkCollision } from "./gameHelpers";
import { usePlayer } from "./hooks/usePlayer";
import { useStage } from "./hooks/useStage";

function App() {
  const [player, resetPlayer, updatePlayerPos, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);
  // const [dropTime, setDropTime] = useState<null|number>(null);


  const movePlayer = (dir: -1 | 1) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  const keyUp = ( keyCode: number ) => {
    if (!false) {
      if (keyCode === 40) {
        // setDropTime(1000)// / (level + 1) + 200);
      }
    }
  };

  const move = ( keyCode: number ) => {
    if (!false) {
      if (keyCode === 37) {
        // left
        console.log("left");
        movePlayer(-1);
      } else if (keyCode === 39) {
        // right
        console.log("right");
        movePlayer(1);
      } else if (keyCode === 40) {
        // down
        dropPlayer();
      } else if (keyCode === 38) {
        // up 
        // while (player.pos.y < STAGE_HEIGHT) {
        //   drop();
        // }
      } else if (keyCode === 90) {
        // z
        console.log("rotate");
        playerRotate(stage, -1);
      } else if (keyCode === 88) {
        // x
        console.log("rotate");
        playerRotate(stage, 1);
      }
    }
  };

  const dropPlayer = () => {
    // setDropTime(null);
    drop();
  };

  const drop = () => {
    // Increase on level when player has cleared 10 rows
    // if (rowsCleared > (level + 1) * 10) {
    //   setLevel(prev => prev + 1);
    //   // Also increase speed
    //   setDropTime(1000 / (level + 1) + 200)
    // }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.position.y < 1) {
        console.log("Game Over!");
        // setGameOver(true);
        // setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  // setInterval(() => {
  //   drop();
  // }, dropTime === null ? undefined : dropTime);

  return (
    <div className="App"
    tabIndex={0}
    onKeyDown={(e) => move(e.keyCode)}>
      <h1>WORDTRIS</h1>
      <h2>
        Size: {BOARD_WIDTH} x {BOARD_HEIGHT}
      </h2>
      <Board stage={stage} />
    </div>
  );
}

export default App;
