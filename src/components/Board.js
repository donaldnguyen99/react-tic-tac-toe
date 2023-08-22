import React, { useState } from "react";
import Square from "./Square";

export default function Board() { 
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquaresState] = useState(Array(9).fill(null));

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  
  function handleClick(id) {
    if (squares[id] || calculateWinner(squares)) return;
    const squaresCopy = [...squares];
    squaresCopy[id] = xIsNext ? "X" : "O";
    setXIsNext(!xIsNext);
    setSquaresState(squaresCopy);
  }

  let boardSize = 3;
  const board = [];
  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let j = 0; j < boardSize; j++) {
      row.push(<Square 
        key={i * boardSize + j} 
        id={i * boardSize + j} 
        value={squares[i * boardSize + j]}
        onSquareClick={() => handleClick(i * boardSize + j)}
      />);
    }
    board.push(<div className="board-row" key={i}>{row}</div>);
  }
  return (
    <div className="board">
      <div className="status">{status}</div>
      {board}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]; 
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; 
    }
  }
  return null;
}