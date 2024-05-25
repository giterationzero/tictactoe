import { useState } from 'react';

export default function Game() {
  const [symbol, setSymbol] = useState("X");
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0,currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    if (symbol == "X") {
      setSymbol("O");
    } else {
      setSymbol("X");
    }
  }

  function jump(nextMove) {
    setCurrentMove(nextMove);
    if (nextMove % 2 === 0) {
      setSymbol("X");
    } else {
      setSymbol("O");
    }
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to move ${move}`;
    } else {
      description = `Go to game start`;
    }return (
      <li key={move}>
        <button onClick={() => jump(move)}>{description}</button>
      </li>
    )
  });

  return(
    <div className='game'>
      <div className='game-board'>
        <Board symbol={symbol} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className='game-info'>
        <ol>
          {moves}
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
      nextSquares[i]="X"
    } else {
      nextSquares[i]="O"
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