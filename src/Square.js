import './App.scss';
import {useState, useEffect} from 'react';
import {capitalize, checkWinner} from './helpers';

const Naughts = () => <span className="naughts"></span>;
const Crosses = () => (
  <span className="crosses">
    <span className="ver"></span>
    <span className="hor"></span>
  </span>
);

export default function Square(props) {
  const [player, setPlayer] = useState(null);
  const currentPlayer = props.state.player;

  const play = (e, moveNum = +e.target.dataset.square) => {
    setPlayer(currentPlayer);
    props.state.setPlayer(prevPlayer => !prevPlayer);

    props.state[`set${capitalize(currentPlayer)}Moves`](prevPlayerMoves => {
      const moves = [...prevPlayerMoves, moveNum];

      props.state.setPossibleMove(prevPossibleMoves => {
        const possible = [...prevPossibleMoves];
        possible.splice(possible.indexOf(moveNum), 1);
        checkWinner(moves, currentPlayer, props.state.setWinner, possible);
        return possible;
      });

      return moves;
    });
  };

  useEffect(() => {
    if (props.pcMove && props.pcMove == props.data && currentPlayer === 'naughts')
      setTimeout(() => play(undefined, +props.pcMove), 700);
  }, [props.pcMove]);

  useEffect(() => {
    if (props.state.reset || !props.state.gameActive) {
      setPlayer(null);
      props.state.setReset(false);
    }
  }, [props.state.reset, props.state.gameActive]);

  const disable =
    player ||
    !props.state.gameActive ||
    props.state.winner ||
    (props.state.gameMode === 'pc' && currentPlayer === 'naughts')
      ? ' disabled'
      : '';

  const classes = 'square' + disable;
  return (
    <button className={classes} data-square={props.data} data-player={player} onClick={play}>
      {player === 'naughts' && <Naughts />}
      {player === 'crosses' && <Crosses />}
    </button>
  );
}
