/* eslint-disable import/prefer-default-export, no-shadow, no-param-reassign, no-return-assign */

export const state = () => ({
  turn: 'w',
  hoveredPosition: null,
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
  shouldHighlightHoveredPosition(state, getters) {
    // Not the player turn
    if (state.turn !== 'w') {
      return false;
    }

    // No hovered position
    if (!state.hoveredPosition) {
      return false;
    }

    const [row, col] = state.hoveredPosition;

    // Position already assigned
    if (state.board[row][col] !== null) {
      return false;
    }

    return getters.isMovementPossible;
  },
  isMovementPossible(state) {
    if (!state.hoveredPosition) {
      return false;
    }

    // Get the opponent of current player
    const opponent = state.turn === 'w' ? 'b' : 'w';
    const [row, col] = state.hoveredPosition;

    return true;
  },
};

export const mutations = {
  setHoveredPosition: (state, positions) => state.hoveredPosition = positions,
  unsetHoveredPosition: state => state.hoveredPosition = null,
};
