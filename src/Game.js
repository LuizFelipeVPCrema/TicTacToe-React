import React, { useState } from 'react';
import './index.css';


function Square(props) {
    return (
        <>
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
        </>
    );
}

function Board(props) {
    function renderSquare(i) {
        return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
    }

    return(
        <>
            <div className='board-row'>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className='board-row'>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className='board-row'>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </>
    )
}


function Game(){
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    function handleClick(i) {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = current.squares.slice();

        if(calculateWinner(squares) || squares[i]){
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';

        setHistory(newHistory.concat([{ squares }]));
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
        const desc = move ? `Próximo a jogar é #${move}` : `Começar outro jogo!`;

        return(
            <li key={move}>
                <button className='button' onClick={() => setStepNumber(move)}>{desc}</button>
            </li>
        );
    });

    let status;

    if (winner){
        status = `Ganhador: ${winner}`;
    } else if (stepNumber === 9 && !winner){
        status = 'Empate';
    } else {
        status = `Proximo jogador: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
        <div className='container'>
            <div className='game'>
                <div className='game-board'>
                    <Board squares={current.squares} onClick={handleClick} />
                </div>
                <div className='game-info'>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        </div>
    );
    
}

function calculateWinner(squares) {
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

    for(let pattern of lines) {
        const [a, b, c] = pattern;

        if(squares[a]  === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}

export default Game;