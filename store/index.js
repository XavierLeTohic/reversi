/* eslint-disable import/prefer-default-export, no-shadow, no-param-reassign, no-return-assign */

function lineIsValid(player, targetRow, targetCol, currentRow, currentCol, board) {
  if (board[currentRow][currentCol] === player) {
    return true;
  }

  const targetRowPosition = currentRow + targetRow;
  const targetColumnPosition = currentCol + targetCol;

  // Row is out of the board
  if (targetRowPosition < 0 || targetRowPosition > 7) {
    return false;
  }

  // Column is out of the board
  if (targetColumnPosition < 0 || targetColumnPosition > 7) {
    return false;
  }

  return lineIsValid(player, targetRow, targetCol, targetRowPosition, targetColumnPosition, board);
}

function isValidMovement(player, targetRow, targetCol, currentRow, currentCol, board) {
  const opponent = player === 'b' ? 'w' : 'b';
  const targetRowPosition = currentRow + targetRow;
  const targetColumnPosition = currentCol + targetCol;
  const nextTargetRowPosition = targetRowPosition + targetRow;
  const nextTargetColumnPosition = targetColumnPosition + targetCol;

  // Row is out of the board
  if (targetRowPosition < 0 || targetRowPosition > 7) {
    return false;
  }

  // Column is out of the board
  if (targetColumnPosition < 0 || targetColumnPosition > 7) {
    return false;
  }

  // The target is not owned by the opponent player
  if (board[targetRowPosition][targetColumnPosition] !== opponent) {
    return false;
  }

  // Second target row on the same direction is out of the board
  if ((nextTargetRowPosition) < 0 || nextTargetRowPosition > 7) {
    return false;
  }

  // Second target column on the same direction is out of the board
  if (nextTargetColumnPosition < 0 || nextTargetColumnPosition > 7) {
    return false;
  }
  return lineIsValid(
    player,
    targetRow,
    targetCol,
    nextTargetRowPosition,
    nextTargetColumnPosition,
    board,
  );
}

function isValidPosition(turn, row, col, board) {
  const nw = isValidMovement(turn, -1, -1, row, col, board);
  const nn = isValidMovement(turn, -1, 0, row, col, board);
  const ne = isValidMovement(turn, -1, 1, row, col, board);
  const ww = isValidMovement(turn, 0, -1, row, col, board);
  const ee = isValidMovement(turn, 0, 1, row, col, board);
  const sw = isValidMovement(turn, 1, -1, row, col, board);
  const ss = isValidMovement(turn, 1, 0, row, col, board);
  const se = isValidMovement(turn, 1, 1, row, col, board);

  if (nn || ne || ee || se || ss || sw || ww || nw) {
    return true;
  }
  return false;
}

export const state = () => ({
  turn: 'b',
  freeze: false,
  board: Array.from({ length: 8 }, (a, row) => Array.from({ length: 8 }, (b, col) => {
    if (row === 3) {
      if (col === 3) {
        return 'w';
      }
      if (col === 4) {
        return 'b';
      }
    }
    if (row === 4) {
      if (col === 3) {
        return 'b';
      }
      if (col === 4) {
        return 'w';
      }
    }
    return null;
  })),
});

export const getters = {
  validMovements(state) {
    const emptyBoard = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null));
    for (let row = 0; row < 8; row += 1) {
      for (let column = 0; column < 8; column += 1) {
        if (state.board[row][column] === null) {
          if (isValidPosition(state.turn, row, column, state.board)) {
            emptyBoard[row][column] = true;
          }
        }
      }
    }

    return emptyBoard;
  },
};

export const mutations = {
  applyPlayerSelection: (state, [row, col]) => {
    // The game was frozen
    if (state.freeze) {
      return false;
    }

    // Freeze the game to prevent the user from selecting another position
    state.freeze = true;
    state.board[row][col] = state.turn;
    state.turn = state.turn === 'b' ? 'w' : 'b';
    state.freeze = false;
    return true;
  },
};
