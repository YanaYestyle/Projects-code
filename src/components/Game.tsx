import React, { useState } from "react";
import { useMachine } from "@xstate/react";
import ticTacToeMachine from "../machine/gameMachine";
import { Wrapper, Button, Status, InputWrapper } from "../styles/componets";
import Board from "./Board";
import AnimatedBackground from "./Background";
import { baseTheme } from "../styles/theme";

const Game: React.FC = () => {
  const [state, send] = useMachine(ticTacToeMachine);
  const [size, setSize] = useState(state.context.size);
  const defaultBoardSize: number = 3;
  const { board, currentPlayer, winner, winningCombo } = state.context;

  const handleStartSinglePlayer = () => {
    send({ type: "START_SINGLE_PLAYER" });
  };

  const handleStartMultiPlayer = () => {
    send({ type: "START_MULTI_PLAYER" });
  };

  const handleCellClick = (index: number) => {
    send({ type: "MOVE", index });
  };

  const handleReset = () => {
    send({ type: "RESET" });
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = event.target.value;
    const regex = /^[3-9]$/;
    if (regex.test(newSize)) {
      const parsedSize = Number(newSize);
      setSize(parsedSize);
      send({ type: "RESET", size: parsedSize });
    } else {
      setSize(defaultBoardSize);
      send({ type: "RESET", size: defaultBoardSize });
    }
  };

  return (
    <>
      {state.matches("idle") && (
        <>
          <Wrapper $bgColor={baseTheme.colors.bg}>
            <AnimatedBackground />
            {state.matches("idle") && (
              <>
                <h1>Tic Tac Toe</h1>
                <Button onClick={handleStartMultiPlayer}>
                  Start Multi Player Game
                </Button>
                <Button onClick={handleStartSinglePlayer}>
                  Start Single Player Game
                </Button>
              </>
            )}
          </Wrapper>
        </>
      )}

      {(state.matches("playing") ||
        state.matches("won") ||
        state.matches("draw")) && (
        <>
          <Wrapper>
            <InputWrapper>
              <label htmlFor="size">Board Size:</label>
              <input
                id="size"
                type="number"
                value={size}
                min="3"
                max="9"
                onChange={handleSizeChange}
              />
            </InputWrapper>
            <Status>
              {winner
                ? winner === "Draw"
                  ? "It's a draw!"
                  : `Player ${winner} wins!`
                : `Current Player: ${currentPlayer}`}
            </Status>
            <Board
              board={board}
              onClick={handleCellClick}
              winningCombo={winningCombo}
              size={size}
            />
            <Button onClick={handleReset}>Reset Game</Button>
          </Wrapper>
        </>
      )}
    </>
  );
};

export default Game;
