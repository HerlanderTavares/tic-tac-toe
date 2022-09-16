export const squares = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const winnerInit = {
  player: null,
  left: null,
  right: null,
  top: null,
  bottom: null,
  rotate: null,
  transition: null,
  origin: null,
  scale: null,
};

export const capitalize = name => {
  return name[0].toUpperCase() + name.slice(1).toLowerCase();
};

export const checkWinner = (moves, player, setWinner, possibleMoves) => {
  const winningPatterns = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const answers = [];
  let winPattern;

  winningPatterns.forEach(arr => {
    const check = arr.every(num => moves.includes(num));
    answers.push(check);
    if (check == true) winPattern = arr;
  });

  checkWinPattern(winPattern, setWinner);

  const hasWon = answers.some(ans => ans === true);
  if (hasWon == true) {
    setWinner(prev => ({...prev, player: `${capitalize(player)} has won!`}));
  } else if (possibleMoves.length === 0) {
    setWinner(prev => ({...prev, player: `It's a draw!`}));
  }
};

export const startGame = (e, state) => {
  state.setGameActive(true);
  state.setGameMode(e.target.id);
};

export const resetGame = (e, state) => {
  state.setReset(true);
  state.setPlayer(true);
  state.setPossibleMove(squares);
  state.setNaughtsMoves([]);
  state.setCrossesMoves([]);
  state.setWinner(winnerInit);
};

export const quitGame = (e, state) => {
  state.setGameActive(false);
  state.setGameMode(null);
  state.setPlayer(true);
  state.setPossibleMove(squares);
  state.setNaughtsMoves([]);
  state.setCrossesMoves([]);
  state.setWinner(winnerInit);
};

function checkWinPattern(pattern, setWinner) {
  switch (`${pattern}`) {
    case '1,2,3':
      setWinner(prev => ({
        ...prev,
        left: '0',
        top: '17%',
        rotate: '-90deg',
        transition: 'scale 300ms ease',
        scale: '1 1',
      }));
      break;
    case '4,5,6':
      setWinner(prev => ({
        ...prev,
        left: '0',
        top: '51%',
        rotate: '-90deg',
        transition: 'scale 300ms ease',
        scale: '1 1',
      }));
      break;
    case '7,8,9':
      setWinner(prev => ({
        ...prev,
        right: '0',
        bottom: '16%',
        rotate: '-90deg',
        transition: 'scale 300ms ease',
        scale: '1 1',
        origin: '0 100%',
      }));
      break;
    case '1,4,7':
      setWinner(prev => ({
        ...prev,
        top: '0',
        left: '16%',
        transition: 'scale 300ms ease',
        scale: '1 1',
      }));
      break;
    case '2,5,8':
      setWinner(prev => ({
        ...prev,
        top: '0',
        left: '50%',
        transition: 'scale 300ms ease',
        scale: '1 1',
      }));
      break;
    case '3,6,9':
      setWinner(prev => ({
        ...prev,
        top: '0',
        right: '16%',
        transition: 'scale 300ms ease',
        scale: '1 1',
      }));
      break;
    case '1,5,9':
      setWinner(prev => ({
        ...prev,
        top: '0',
        left: '50%',
        rotate: '-45deg',
        origin: 'unset',
        transition: 'scale 300ms ease',
        scale: '1 1.3',
      }));
      break;
    case '3,5,7':
      setWinner(prev => ({
        ...prev,
        top: '0',
        left: '50%',
        rotate: '45deg',
        origin: 'unset',
        transition: 'scale 300ms ease',
        scale: '1 1.3',
      }));
      break;
    default:
      setWinner(prev => ({...prev}));
      break;
  }
}
