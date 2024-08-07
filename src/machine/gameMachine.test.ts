import { createActor } from "xstate";
import gameMachine from "./gameMachine";

describe("gameMachine", () => {
  let service: ReturnType<typeof createActor>;

  beforeEach(() => {
    service = createActor(gameMachine).start();
  });

  test("initial state is idle", () => {
    const snapshot = service.getSnapshot();
    expect(snapshot.value).toBe("idle");
    expect(snapshot.context.board).toEqual(Array(9).fill(null));
  });

  test("transitions to playing state on START_MULTI_PLAYER", () => {
    service.send({ type: "START_MULTI_PLAYER" });
    const snapshot = service.getSnapshot();
    expect(snapshot.value).toBe("playing");
    expect(snapshot.context.isSinglePlayer).toBe(false);
  });

  test("transitions to playing state on START_SINGLE_PLAYER", () => {
    service.send({ type: "START_SINGLE_PLAYER" });
    const snapshot = service.getSnapshot();
    expect(snapshot.value).toBe("playing");
    expect(snapshot.context.isSinglePlayer).toBe(true);
  });

  test("makes a move and switches players", () => {
    service.send({ type: "START_MULTI_PLAYER" });
    service.send({ type: "MOVE", index: 0 });
    const snapshot = service.getSnapshot();
    expect(snapshot.context.board[0]).toBe("X");
    expect(snapshot.context.currentPlayer).toBe("O");
  });

  test("ignores move if cell is already filled", () => {
    service.send({ type: "START_MULTI_PLAYER" });
    service.send({ type: "MOVE", index: 0 });
    service.send({ type: "MOVE", index: 0 });
    const snapshot = service.getSnapshot();
    expect(snapshot.context.board[0]).toBe("X");
  });

  test("detects a win and transitions to won state", () => {
    service.send({ type: "START_MULTI_PLAYER" });

    const moves = [0, 3, 1, 4, 2];

    moves.forEach((index) => {
      service.send({ type: "MOVE", index });
    });

    const snapshot = service.getSnapshot();
    expect(snapshot.context.winner).toBe("X");
    expect(snapshot.value).toBe("won");
  });

  test("detects a draw and transitions to draw state", () => {
    service.send({ type: "START_MULTI_PLAYER" });

    const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8]; // Draw

    moves.forEach((index) => {
      service.send({ type: "MOVE", index });
    });

    const snapshot = service.getSnapshot();
    expect(snapshot.context.winner).toBe("Draw");
    expect(snapshot.value).toBe("draw");
  });

  test("resets the game", () => {
    service.send({ type: "START_MULTI_PLAYER" });

    const moves = [0, 3, 1, 4, 2]; // X wins

    moves.forEach((index) => {
      service.send({ type: "MOVE", index });
    });

    service.send({ type: "RESET" });

    const snapshot = service.getSnapshot();
    expect(snapshot.value).toBe("playing");
    expect(snapshot.context.board).toEqual(Array(9).fill(null));
    expect(snapshot.context.currentPlayer).toBe("X");
    expect(snapshot.context.winner).toBe(null);
    expect(snapshot.context.winningCombo).toBe(null);
    expect(snapshot.context.size).toBe(3);
  });
});
