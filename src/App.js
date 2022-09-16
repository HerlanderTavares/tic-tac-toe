import './App.scss';
import Square from './Square';
import Button from './MenuBtn';
import {useState, useEffect} from 'react';
import {startGame, resetGame, quitGame, squares, winnerInit} from './helpers';

const resize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

resize();
window.addEventListener('resize', resize);

function App() {
  const [player, setPlayer] = useState(true);
  const currentPlayer = player ? 'crosses' : 'naughts';
  const [gameActive, setGameActive] = useState(false);
  const [gameMode, setGameMode] = useState(null);
  const [reset, setReset] = useState(false);

  const [possibleMove, setPossibleMove] = useState(squares);
  const [naughtsMoves, setNaughtsMoves] = useState([]);
  const [crossesMoves, setCrossesMoves] = useState([]);
  const [pcMove, setPcMove] = useState(null);
  const [winner, setWinner] = useState(winnerInit);

  const lineStyles = {
    left: winner.left,
    right: winner.right,
    top: winner.top,
    bottom: winner.bottom,
    rotate: winner.rotate,
    transition: winner.transition,
    transformOrigin: winner.origin,
    scale: winner.scale,
  };

  const state = {
    player: currentPlayer,
    setPlayer: setPlayer,
    gameActive: gameActive,
    setGameActive: setGameActive,
    gameMode: gameMode,
    setGameMode: setGameMode,
    reset: reset,
    setReset: setReset,
    possibleMove: possibleMove,
    setPossibleMove: setPossibleMove,
    naughtsMoves: naughtsMoves,
    setNaughtsMoves: setNaughtsMoves,
    crossesMoves: crossesMoves,
    setCrossesMoves: setCrossesMoves,
    winner: winner.player,
    setWinner: setWinner,
    pcMove: pcMove,
    setPcMove: setPcMove,
  };

  useEffect(() => {
    if (
      gameMode === 'pc' &&
      currentPlayer === 'naughts' &&
      possibleMove.length > 0 &&
      !winner.player
    ) {
      const index = Math.floor(Math.random() * (possibleMove.length - 1));
      const moveNum = possibleMove[index];
      setPcMove(moveNum);
    }
  }, [currentPlayer]);

  const squareBtns = squares.map(num => (
    <Square key={num} data={num} state={state} pcMove={pcMove} />
  ));

  return (
    <div className="App">
      <div className="game">
        <div className="board">
          <div className="board__container">
            {squareBtns}
            <span className="winner-line" style={lineStyles}></span>
          </div>
        </div>

        <div className="menu">
          <h1>Tic-Tac-Toe</h1>

          {!gameActive && !winner.player && (
            <div className="menu__block">
              <span className="subtitle">New Game</span>
              <Button label="vs PC" onClick={e => startGame(e, state)} id="pc" />
              <Button label="Multiplayer" onClick={e => startGame(e, state)} id="mp" />
            </div>
          )}

          {gameActive && (
            <div className="menu__block">
              <Button label="Restart Game" onClick={e => resetGame(e, state)} />
              <Button label="Quit" onClick={e => quitGame(e, state)} />
            </div>
          )}

          {gameActive && !winner.player && (
            <span className="menu__prompt">{currentPlayer} Turn</span>
          )}
          {winner.player && <span className="menu__prompt">{winner.player}</span>}
        </div>
      </div>
    </div>
  );
}

export default App;
