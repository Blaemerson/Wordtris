export type Cell = {
  letter: string;
  type: "empty" | "merged";
};

export function Cell({ letter, type }: Cell) {
  return <div className="cell">{letter}</div>;
}
