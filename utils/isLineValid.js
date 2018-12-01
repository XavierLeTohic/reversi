export default function isLineValid(player, rowDirection, colDirection, row, col, board) {
  if (board[row][col] === player) {
    return true;
  }
  if (board[row][col] === null) {
    return false;
  }

  const targetRow = row + rowDirection;
  const targetColumn = col + colDirection;

  // Row is out of the board
  if (targetRow < 0 || targetRow > 7) {
    return false;
  }

  // Column is out of the board
  if (targetColumn < 0 || targetColumn > 7) {
    return false;
  }
  return isLineValid(player, rowDirection, colDirection, targetRow, targetColumn, board);
}
