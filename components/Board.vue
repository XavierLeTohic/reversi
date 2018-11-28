<template>
  <div class="board">
    <div
      v-for="(row, rowIndex) in board"
      :key="rowIndex"
      class="row"
    >
      <div
        v-for="(col, colIndex) in row"
        :key="colIndex"
        class="column"
        @mouseenter="mouseEnter(rowIndex, colIndex)"
        @mouseleave="mouseLeave"
      >
        <img
          v-if="col === 'b'"
          src="~/assets/pieceBlack.png"
        >
        <img
          v-if="col === 'w'"
          src="~/assets/pieceWhite.png"
        >
        <div
          v-if="shouldHighlightPosition(rowIndex, colIndex)"
          class="highlight"
        />
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  name: 'Board',
  data() {
    return {
      highlighted: null,
    };
  },
  computed: {
    ...mapState([
      'board',
      'hoveredPosition',
    ]),
    ...mapGetters([
      'shouldHighlightHoveredPosition',
    ]),
  },
  methods: {
    ...mapMutations([
      'setHoveredPosition',
      'unsetHoveredPosition',
    ]),
    mouseEnter(row, col) {
      this.setHoveredPosition([row, col]);
    },
    mouseLeave() {
      this.unsetHoveredPosition();
    },
    shouldHighlightPosition(row, col) {
      if (!this.hoveredPosition) {
        return false;
      }

      if (row !== this.hoveredPosition[0] || col !== this.hoveredPosition[1]) {
        return false;
      }

      return this.shouldHighlightHoveredPosition;
    },
  },
};
</script>

<style lang="stylus" scoped>
.board
  display flex
  flex-direction column
  flex-wrap wrap
  height 100%
  user-select none

  .row
    display: flex;
    flex-basis: calc(100% / 8)

    .column
      flex-basis: calc(100% / 8)
      border 1px solid black
      border-radius: 4px;
      background-color seagreen
      box-shadow inset 0 0 7px #013303

      img
        width 100%
        height auto

      .highlight
        height 100%
        width 100%
        background-color rgba(255, 132, 0, 0.60)
</style>
