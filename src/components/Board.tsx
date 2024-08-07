import React from "react";
import { Cell, Grid, WinningLine, WordSpan } from "../styles/componets";

const Board: React.FC<{
  board: (string | null)[];
  onClick: (index: number) => void;
  winningCombo?: number[] | null;
  size: number;
}> = ({ board, onClick, winningCombo, size }) => (
  <Grid size={size}>
    {board.map((cell, index) => (
      <Cell
        className="word"
        key={index}
        onClick={() => onClick(index)}
        $player={cell as "X" | "O"}
        style={{ pointerEvents: cell !== null ? "none" : "auto" }}
      >
        <WordSpan $isActive={cell ? true : null}>{cell}</WordSpan>
      </Cell>
    ))}
    <WinningLine $line={winningCombo} $size={size} />
  </Grid>
);

export default Board;
