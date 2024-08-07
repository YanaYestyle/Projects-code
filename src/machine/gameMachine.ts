import { createMachine, assign } from "xstate";
export type Player = "X" | "O";
export type GameOutcome = Player | "Draw" | null;
export interface TicTacToeContext {
  board: (Player | null)[];
  currentPlayer: Player | null;
  winner: GameOutcome;
  size: number;
  winningCombo?: number[] | null;
  isSinglePlayer: boolean;
}

const defaultPlayer: Player = "X";

const generateWinningCombos = (size: number): number[][] => {
  const combos: number[][] = [];

  // Rows
  for (let row = 0; row < size; row++) {
    const rowStart = row * size;
    combos.push(Array.from({ length: size }, (_, i) => rowStart + i));
  }

  // Columns
  for (let col = 0; col < size; col++) {
    combos.push(Array.from({ length: size }, (_, i) => col + i * size));
  }

  // Diagonals
  combos.push(Array.from({ length: size }, (_, i) => i * (size + 1))); // Top-left to bottom-right
  combos.push(Array.from({ length: size }, (_, i) => (i + 1) * (size - 1))); // Top-right to bottom-left

  return combos;
};

const checkWinner = (
  board: (Player | null)[],
  size: number
): { winner: GameOutcome; winningCombo: number[] | null } => {
  const winningCombos = generateWinningCombos(size);

  for (const combo of winningCombos) {
    if (
      combo.every(
        (index) => board[index] === board[combo[0]] && board[index] !== null
      )
    ) {
      return { winner: board[combo[0]] as Player, winningCombo: combo };
    }
  }

  return { winner: board.includes(null) ? null : "Draw", winningCombo: null };
};

const gameMachine = createMachine(
  {
    id: "ticTacToe",
    initial: "idle",
    context: {
      board: Array(9).fill(null),
      currentPlayer: defaultPlayer,
      winner: null,
      winningCombo: null,
      size: 3,
      isSinglePlayer: false,
    } as TicTacToeContext,
    states: {
      idle: {
        on: {
          START_SINGLE_PLAYER: {
            target: "playing",
            actions: assign({
              isSinglePlayer: () => true,
            }),
          },
          START_MULTI_PLAYER: {
            target: "playing",
            actions: assign({
              isSinglePlayer: () => false,
            }),
          },
        },
      },
      playing: {
        on: {
          MOVE: {
            actions: [
              assign({
                board: (context) => {
                  if (
                    !context.context.board[context.event.index] &&
                    !context.context.winner
                  ) {
                    const newBoard = [...context.context.board];
                    newBoard[context.event.index] =
                      context.context.currentPlayer;
                    return newBoard;
                  }
                  return context.context.board;
                },
                currentPlayer: (context) =>
                  context.context.currentPlayer === "X" ? "O" : "X",
              }),
              assign({
                winner: (context) => {
                  const { winner, winningCombo } = checkWinner(
                    context.context.board,
                    context.context.size
                  );
                  context.context.winningCombo = winningCombo;
                  return winner;
                },
                winningCombo: (context) => {
                  const { winningCombo } = checkWinner(
                    context.context.board,
                    context.context.size
                  );
                  return winningCombo;
                },
              }),
            ],
          },
          RESET: {
            target: "playing",
            actions: assign({
              board: (context) => {
                const newSize = context.event.size || context.context.size;
                return Array(newSize * newSize).fill(null);
              },
              currentPlayer: () => defaultPlayer,
              winner: () => null,
              winningCombo: () => null,
              size: (context) => context.event.size || context.context.size,
            }),
          },
        },
        always: [
          {
            target: "won",
            guard: (context) =>
              context.context.winner !== null &&
              context.context.winner !== "Draw",
          },
          {
            target: "draw",
            guard: (context) => context.context.winner === "Draw",
          },
          {
            target: "playing",
            guard: (context) =>
              context.context.isSinglePlayer &&
              context.context.currentPlayer === "O" &&
              !context.context.winner,
            actions: ["makeAIMove", "checkAIWinnner"],
          },
        ],
      },
      won: {
        on: {
          RESET: {
            target: "playing",
            actions: assign({
              board: (context) => {
                const newSize = context.event.size || context.context.size;
                return Array(newSize * newSize).fill(null);
              },
              currentPlayer: () => defaultPlayer,
              winner: () => null,
              winningCombo: () => null,
              size: (context) => context.event.size || context.context.size,
            }),
          },
        },
      },
      draw: {
        on: {
          RESET: {
            target: "playing",
            actions: assign({
              board: (context) => {
                const newSize = context.event.size || context.context.size;
                return Array(newSize * newSize).fill(null);
              },
              currentPlayer: () => defaultPlayer,
              winner: () => null,
              winningCombo: () => null,
              size: (context) => context.event.size || context.context.size,
            }),
          },
        },
      },
    },
  },
  {
    actions: {
      makeAIMove: assign({
        board: (context) => {
          const emptyIndices = context.context.board
            .map((cell, index) => (cell === null ? index : null))
            .filter((index) => index !== null);
          if (emptyIndices.length > 0) {
            const randomIndex =
              emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
            const newBoard = [...context.context.board];
            newBoard[randomIndex!] = context.context.currentPlayer;
            return newBoard;
          }
          return context.context.board;
        },
        currentPlayer: (context) =>
          context.context.currentPlayer === "X" ? "O" : "X",
      }),
      checkAIWinnner: assign({
        winner: (context) => {
          const { winner, winningCombo } = checkWinner(
            context.context.board,
            context.context.size
          );
          context.context.winningCombo = winningCombo;
          return winner;
        },
        winningCombo: (context) => {
          const { winningCombo } = checkWinner(
            context.context.board,
            context.context.size
          );
          return winningCombo;
        },
      }),
    },
  }
);

export default gameMachine;
