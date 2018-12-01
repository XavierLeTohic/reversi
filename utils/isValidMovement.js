import isLineValid from './isLineValid';

export default function isValidMovement(player, rowDirection, colDirection, row, col, board) {
  const opponent = player === 'b' ? 'w' : 'b';
  const targetRow = row + rowDirection;
  const targetColumn = col + colDirection;
  const nextRow = targetRow + rowDirection;
  const nextColumn = targetColumn + colDirection;

  // Row is out of the board
  if (targetRow < 0 || targetRow > 7) {
    return false;
  }

  // Column is out of the board
  if (targetColumn < 0 || targetColumn > 7) {
    return false;
  }

  // The target is not owned by the opponent player
  if (board[targetRow][targetColumn] !== opponent) {
    return false;
  }

  // Second target row on the same direction is out of the board
  if (nextRow < 0 || nextRow > 7) {
    return false;
  }

  // Second target column on the same direction is out of the board
  if (nextColumn < 0 || nextColumn > 7) {
    return false;
  }
  return isLineValid(
    player,
    rowDirection,
    colDirection,
    nextRow,
    nextColumn,
    board,
  );
}
