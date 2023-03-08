import { Board } from "./components/Board";
import { BOARD_HEIGHT, BOARD_WIDTH } from "./gameHelpers";
import { usePlayer } from "./hooks/usePlayer";
import { useStage } from "./hooks/useStage";

function App() {
  const [player, resetPlayer, updatePlayerPos, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  return (
    <div className="App">
      <h1>WORDTRIS</h1>
      <h2>
        Size: {BOARD_WIDTH} x {BOARD_HEIGHT}
      </h2>
      <Board stage={stage} />
    </div>
  );
}

export default App;
