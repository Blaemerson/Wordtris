import { Cell, Cell as CellType } from "./Cell";

type BoardProps = {
  stage: CellType[][];
};

export function Board({ stage }: BoardProps) {
  return (
    <div className="center-screen">
      <div className="stage">
        {stage.map((row) =>
          row.map((cell, x) => (
            <Cell key={x} letter={cell.letter} type={cell.type} />
          ))
        )}
      </div>
    </div>
  );
}
