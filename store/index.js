/* eslint-disable
  import/prefer-default-export,
  import/no-extraneous-dependencies,
  no-shadow,
  no-param-reassign,
  no-return-assign
*/
import Vue from 'vue';

import NewBoard from '../utils/NewBoard';
import isValidPosition from '../utils/isValidPosition';
// import MiniMax from '../utils/MiniMax';

const initialState = () => ({
  userEmoji: '🦊', // Default user emoji
  multiplayer: false, // The game is multiplayer on the same screen
  againstAI: true, // The game is against an AI
  online: false, // The game is multiplayer and online
  end: false, // Is the game has ended
  freeze: false, // Is the game was frozen to avoid any changes during animations etc.
  color: ['b', 'w'][Math.round(Math.random())], // Random selection of the color
  currentPlayer: 'b', // First player is always the one with black tokens
  showNextTurnBanner: true, // Display which player will play the first turn
  board: NewBoard(8),
});

export const state = () => initialState();

export const getters = {
  validMovements(state) {
    const emptyBoard = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null));
    for (let row = 0; row < 8; row += 1) {
      for (let column = 0; column < 8; column += 1) {
        if (state.board[row][column] === null) {
          if (isValidPosition(state.currentPlayer, row, column, state.board)) {
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

    // Reduce seems to broke something here
    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        if (state.board[row][col] === 'w') {
          whiteTokens += 1;
        }
      }
    }
    return whiteTokens;
  },
  blackTokens(state) {
    // Return the number of black tokens on the board
    let blackTokens = 0;

    // Reduce seems to broke something here
    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        if (state.board[row][col] === 'b') {
          blackTokens += 1;
        }
      }
    }
    return blackTokens;
  },
  isBoardComplete(state, getters) {
    return getters.validMovements.every(rows => rows.every(col => col === null));
  },
};

export const actions = {
  makePlayerMove: async ({ commit, dispatch, state, getters }, [row, col]) => {
    // Put the token on the board only if the game was not frozen
    if (!state.freeze) {
      // Put the token at the position choosed by the user
      commit('setTokenAtPosition', { row, col, playerColor: state.color });
      // Freeze the game to prevent user to put new token on the board
      commit('freeze');
      // Wait for tokens to be check and flipped if needed
      await dispatch('updateTokensColor', { row, col, playerColor: state.color });
      // Update the current user for the next turn
      await commit('setCurrentPlayer', state.currentPlayer === 'b' ? 'w' : 'b');

      // Switch player and display next turn banner only if valid movements exist
      if (!getters.isBoardComplete) {
        dispatch('showNextTurnBanner');
        // Is againstAI
        if (state.againstAI && state.currentPlayer !== state.color) {
          const delayAITurn = setTimeout(async () => {
            // Make the AI move
            dispatch('makeAIMove');
            clearTimeout(delayAITurn);
          }, 1000);
        }
      } else {
        dispatch('endOfTheGame');
      }
    }
  },
  // Make the AI move
  makeAIMove: async ({ getters, commit, dispatch, state: { color, currentPlayer } }) => {
    const validMovements = getters.validMovements.reduce((acc, row, rowIndex) => {
      for (let col = 0; col < row.length; col += 1) {
        // If the row and the column is a valid position
        if (row[col]) {
          acc.push({
            row: rowIndex,
            col,
          });
        }
      }

      return acc;
    }, []);

    // TODO use minimax algo
    const randomMovement = Math.floor((Math.random() * (validMovements.length - 1)) + 0) || 0;
    const { row, col } = validMovements[randomMovement];

    await commit('setTokenAtPosition', { row, col, playerColor: (color === 'w' ? 'b' : 'w') });
    // Wait for tokens to be check and flipped if needed
    await dispatch('updateTokensColor', { row, col, playerColor: (color === 'w' ? 'b' : 'w') });
    // Update the current user for the next turn
    await commit('setCurrentPlayer', currentPlayer === 'b' ? 'w' : 'b');

    if (getters.isBoardComplete) {
      dispatch('endOfTheGame');
    } else {
      // Display next turn banner
      dispatch('showNextTurnBanner');
    }
  },
  // Update the tokens color if needed
  updateTokensColor: async ({ dispatch, state: { board } }, { row, col, playerColor }) => {
    const tasks = [
      dispatch('updateTokensOnLine', [playerColor, -1, -1, row, col, board]),
      dispatch('updateTokensOnLine', [playerColor, -1, 0, row, col, board]),
      dispatch('updateTokensOnLine', [playerColor, -1, 1, row, col, board]),
      dispatch('updateTokensOnLine', [playerColor, 0, -1, row, col, board]),
      dispatch('updateTokensOnLine', [playerColor, 0, 1, row, col, board]),
      dispatch('updateTokensOnLine', [playerColor, 1, -1, row, col, board]),
      dispatch('updateTokensOnLine', [playerColor, 1, 0, row, col, board]),
      dispatch('updateTokensOnLine', [playerColor, 1, 1, row, col, board]),
    ];

    await Promise.all(tasks);
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
      await commit('flipTokenAtPosition', { row: targetRow, col: targetColumn, playerColor: player });
      return true;
    }
    return false;
  },
  showNextTurnBanner: ({ commit }) => {
    // Allow the next turn banner to be displayed
    commit('showNextTurnBanner');
    // Wait for the enter animation of the banner to end
    const nextTurnBannerEnterAnimation = setTimeout(async () => {
      // Clear the current
      clearTimeout(nextTurnBannerEnterAnimation);
      // Hide the banner
      commit('hideNextTurnBanner');
      // Unfreeze the game
      commit('unFreeze');
    }, 1000);
  },
  endOfTheGame: async ({ commit }) => {
    // Freeze the game to avoid any problems
    commit('freeze');
    commit('endTheGame');
  },
};

export const mutations = {
  // Freeze the game to prevent the user from put a token on the board
  freeze: state => state.freeze = true,
  // Unfreeze the game
  unFreeze: state => state.freeze = false,
  // Put the user token on the board. This mutation is call after a user interaction
  setTokenAtPosition: (state, { row, col, playerColor }) => {
    // Avoid to put a token on the board if the game was frozen
    if (!state.freeze) {
      // Add a token of the current player to the selected position
      Vue.set(
        state.board,
        row,
        state.board[row].map((value, i) => (i === col ? playerColor : value)),
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
  setCurrentPlayer: (state, player) => state.currentPlayer = player,
  // Show the next turn banner,
  showNextTurnBanner: state => state.showNextTurnBanner = true,
  // Hide the next turn banner
  hideNextTurnBanner: state => state.showNextTurnBanner = false,
  endTheGame: state => state.end = true,
  resetState: (state) => {
    // Avoid overwrite user emoji
    const { userEmoji, ...newStates } = initialState();
    Object.keys(newStates).forEach(key => state[key] = newStates[key]);
  },
  setEmoji: (state, emoji) => state.userEmoji = emoji,
};
