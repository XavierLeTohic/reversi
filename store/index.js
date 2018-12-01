/* eslint-disable
  import/prefer-default-export,
  import/no-extraneous-dependencies,
  no-shadow,
  no-param-reassign,
  no-return-assign
*/
import Vue from 'vue';

import isValidPosition from '../utils/isValidPosition';

export const state = () => ({
  color: ['b', 'w'][Math.round(Math.random())],
  player: 'b',
  freeze: false,
  showNextTurnBanner: true,
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
    let whiteTokens = 0;

    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        if (state.board[row][col] === 'w') {
          console.log(row, col);
          whiteTokens += 1;
        }
      }
    }
    console.log('w', whiteTokens);
    return whiteTokens;
  },
  blackTokens(state) {
    // Return the number of black tokens on the board
    let blackTokens = 0;

    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        if (state.board[row][col] === 'b') {
          blackTokens += 1;
        }
      }
    }
    return blackTokens;
  },
};

export const actions = {
  applyPlayerSelection: async ({ commit, dispatch, state: { player, freeze } }, position) => {
    // Put the token on the board only if the game was not frozen
    if (!freeze) {
      // Put the token at the position choosed by the user
      commit('setTokenToPosition', position);
      // Freeze the game to prevent user to put new token on the board
      commit('freeze');
      // Wait for tokens to be check and flipped if needed
      await dispatch('updateTokensColor', position);
      // Update the current user for the next turn
      commit('setCurrentPlayer', player === 'b' ? 'w' : 'b');
      // Allow the next turn banner to be displayed
      commit('showNextTurnBanner');
      // Wait for the enter animation of the banner to end
      const nextTurnBannerEnterAnimation = setTimeout(() => {
        // Hide the banner
        commit('hideNextTurnBanner');
        // Unfreeze the game
        commit('unFreeze');
        // Clear the current
        clearTimeout(nextTurnBannerEnterAnimation);
      }, 1000);
    }
  },
  // Update the tokens color if needed
  updateTokensColor: async ({ dispatch, state: { player, board } }, [row, col]) => {
    await dispatch('updateTokensOnLine', [player, -1, -1, row, col, board]);
    await dispatch('updateTokensOnLine', [player, -1, 0, row, col, board]);
    await dispatch('updateTokensOnLine', [player, -1, 1, row, col, board]);
    await dispatch('updateTokensOnLine', [player, 0, -1, row, col, board]);
    await dispatch('updateTokensOnLine', [player, 0, 1, row, col, board]);
    await dispatch('updateTokensOnLine', [player, 1, -1, row, col, board]);
    await dispatch('updateTokensOnLine', [player, 1, 0, row, col, board]);
    await dispatch('updateTokensOnLine', [player, 1, 1, row, col, board]);
  },
  // Update tokens on a line if the line is valid
  updateTokensOnLine: async ({ dispatch, commit }, params) => {
    const [player, rowDirection, colDirection, row, col, board] = params;
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
    // The target is own by the player
    if (board[targetRow][targetColumn] === player) {
      return true;
    }
    // Recursive check of the line
    const valid = await dispatch('updateTokensOnLine', [player, rowDirection, colDirection, targetRow, targetColumn, board]);
    if (valid) {
      commit('flipTokenAtPosition', { row: targetRow, col: targetColumn, playerColor: player });
      return true;
    }
    return false;
  },
};

export const mutations = {
  // Freeze the game to prevent the user from put a token on the board
  freeze: state => state.freeze = true,
  // Unfreeze the game
  unFreeze: state => state.freeze = false,
  // Put the user token on the board. This mutation is call after a user interaction
  setTokenToPosition: (state, [row, col]) => {
    // Avoid to put a token on the board if the game was frozen
    if (!state.freeze) {
      // Add a token of the current player to the selected position
      Vue.set(
        state.board,
        row,
        state.board[row].map((value, i) => (i === col ? state.player : value)),
      );
    }
  },
  // Flip a token to another color at the given position
  flipTokenAtPosition: (state, { row, col, playerColor }) => {
    Vue.set(
      state.board,
      row,
      state.board[row].map((value, i) => (i === col ? playerColor : value)),
    );
  },
  // Update the current player who must play
  setCurrentPlayer: (state, player) => state.player = player,
  // Show the next turn banner,
  showNextTurnBanner: state => state.showNextTurnBanner = true,
  // Hide the next turn banner
  hideNextTurnBanner: state => state.showNextTurnBanner = false,
};
