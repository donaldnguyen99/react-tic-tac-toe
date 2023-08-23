import React, { useState } from "react";
import Board from "./Board";

export default function Game() {
  
  const [history, setHistoryState] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistoryState(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (move === currentMove) ? (
      <li key={move}>You are at move #{move}</li>
    ) : (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          xIsNext={xIsNext} 
          onPlay={handlePlay}
          squares={currentSquares}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}