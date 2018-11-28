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
        :class="{
          column: true,
          selectable: turn === 'b' && validMovements[rowIndex][colIndex] === true
        }"
        @click="onSelection(rowIndex, colIndex)"
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
          v-if="turn === 'b' && validMovements[rowIndex][colIndex] === true"
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
      'turn',
      'board',
      'hoveredPosition',
    ]),
    ...mapGetters([
      'shouldHighlightHoveredPosition',
      'validMovements',
    ]),
  },
  methods: {
    ...mapMutations([
      'applyPlayerSelection',
    ]),
    onSelection(row, col) {
      if (this.validMovements[row][col] === true) {
        this.applyPlayerSelection([row, col]);
      }
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
    display flex
    flex-basis calc(100% / 8)

    .column
      display flex
      align-content center
      justify-content center
      flex-basis: calc(100% / 8)
      border 1px solid black
      border-radius: 4px;
      background-color seagreen
      box-shadow inset 0 0 3px #013303

      &.selectable
        cursor pointer

      img
        width 100%
        height auto

      .highlight
        height 100%
        width 100%
        background-color rgba(255, 132, 0, 0.60)
</style>
