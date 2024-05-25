import { useState } from 'react';

export default function Game() {
  const [symbol, setSymbol] = useState("X");
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];
  function handlePlay(nextSquares) {
    if (symbol == "X") {
      setSymbol("O");
    } else {
      setSymbol("X");
    }
    setHistory([...history,nextSquares]);
  }
  return(
    <div className='game'>
      <div className='game-board'>
        <Board symbol={symbol} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className='game-info'>
        <ol>
          {"TODO"}
        </ol>
      </div>
    </div>
  );
}

export function Square({value, onSquareClick}) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export function Board({symbol, squares, onPlay}) {
  function handleClick(i) {
    const nextSquares = squares.slice();
    if (nextSquares[i] != null || declareWinner(nextSquares) != null) {
      return;
    }
    if (symbol === "X") {
      nextSquares[i]="O"
    } else {
      nextSquares[i]="X"
    }
    onPlay(nextSquares);
  }

  const winner = declareWinner(squares);
  let status;
  if (winner == null) {
    status = `Next player: ${symbol}`; 
  } else {
    status = `Winner: ${winner}`;
  }

  return (
    <>
      <div className = "status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}

function declareWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (squares[a] != null && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}