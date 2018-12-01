import isValidMovement from './isValidMovement';

export default function isValidPosition(player, row, col, board) {
  const nw = isValidMovement(player, -1, -1, row, col, board);
  const nn = isValidMovement(player, -1, 0, row, col, board);
  const ne = isValidMovement(player, -1, 1, row, col, board);
  const ww = isValidMovement(player, 0, -1, row, col, board);
  const ee = isValidMovement(player, 0, 1, row, col, board);
  const sw = isValidMovement(player, 1, -1, row, col, board);
  const ss = isValidMovement(player, 1, 0, row, col, board);
  const se = isValidMovement(player, 1, 1, row, col, board);

  if (nn || ne || ee || se || ss || sw || ww || nw) {
    return true;
  }
  return false;
}
