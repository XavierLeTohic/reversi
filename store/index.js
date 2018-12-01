/* eslint-disable
  import/prefer-default-export,
  import/no-extraneous-dependencies,
  no-shadow,
  no-param-reassign,
  no-return-assign
*/
import Vue from 'vue';

function lineIsValid(player, rowDirection, colDirection, row, col, board) {
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
  return lineIsValid(player, rowDirection, colDirection, targetRow, targetColumn, board);
}

function isValidMovement(player, rowDirection, colDirection, row, col, board) {
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
  return lineIsValid(
    player,
    rowDirection,
    colDirection,
    nextRow,
    nextColumn,
    board,
  );
}

function isValidPosition(player, row, col, board) {
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

function updateTokensOnLine(player, rowDirection, colDirection, row, col, board) {
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

  // The target is not owned
  if (board[targetRow][targetColumn] === null) {
    return false;
  }

  if (board[targetRow][targetColumn] === player) {
    return true;
  }

  if (updateTokensOnLine(player, rowDirection, colDirection, targetRow, targetColumn, board)) {
    board[targetRow][targetColumn] = player;
    return true;
  }

  return false;
}

function updateTokensColor(player, row, col, board) {
  updateTokensOnLine(player, -1, -1, row, col, board);
  updateTokensOnLine(player, -1, 0, row, col, board);
  updateTokensOnLine(player, -1, 1, row, col, board);
  updateTokensOnLine(player, 0, -1, row, col, board);
  updateTokensOnLine(player, 0, 1, row, col, board);
  updateTokensOnLine(player, 1, -1, row, col, board);
  updateTokensOnLine(player, 1, 0, row, col, board);
  updateTokensOnLine(player, 1, 1, row, col, board);
}

export const state = () => ({
  player: 'b',
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
          if (isValidPosition(state.player, row, column, state.board)) {
            emptyBoard[row][column] = true;
          }
        }
      }
    }

    return emptyBoard;
  },
  whiteTokens(state) {
    // Return the number of white tokens on the board
    return state.board.reduce((acc, row) => acc += row.reduce((a, col) => a += (col === 'w' ? 1 : 0), 0), 0);
  },
  blackTokens(state) {
    // Return the number of black tokens on the board
    return state.board.reduce((acc, row) => acc += row.reduce((a, col) => a += (col === 'b' ? 1 : 0), 0), 0);
  },
};

export const mutations = {
  applyPlayerSelection: (state, [row, col]) => {
    // The game is not frozen
    if (!state.freeze) {
      // Freeze the game to prevent the user from selecting another position
      state.freeze = true;
      // Add a token of the current player to the selected position
      Vue.set(
        state.board,
        row,
        state.board[row].map((value, i) => (i === col ? state.player : value)),
      );
      // Update the tokens if they should change
      updateTokensColor(state.player, row, col, state.board);
      state.player = state.player === 'b' ? 'w' : 'b';
      // Unfreeze the game
      state.freeze = false;
    }
  },
};
