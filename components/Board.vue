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
          box: true,
          selectable: player === 'b' && validMovements[rowIndex][colIndex] === true
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
          v-if="validMovements[rowIndex][colIndex] === true"
          :class="{ highlight: true, [player]: true }"
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
      'player',
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
/* eslint-disable */
.board
  display flex
  flex-direction column
  flex-wrap wrap
  align-content center
  justify-content center
  user-select none
  background-image radial-gradient(circle, #25bc41, #20a83b, #1c9435, #19812f, #166e29)
  box-shadow inset 0px 0px 16px -2px #000000
  border 7px solid rgb(141, 81, 49)
  border-radius 4px

.row
  display flex
  max-width 368px

  .box
    &:first-child
      border-left none
      border-image-width 1px 1px 1px 0

    &:last-child
      border-right none
      border-image-width 1px 0 1px 1px

  &:first-child .box
    border-top none
    border-image-width 0 1px 1px 1px

    &:first-child
      border-image-width 0 1px 1px 0

    &:last-child
      border-image-width 0 0 1px 1px

  &:last-child .box
    border-bottom none
    border-image-width 1px 1px 0 1px

    &:first-child

      border-image-width 1px 1px 0 0
    &:last-child
      border-image-width 1px 0 0 1px

.box
  display flex
  align-content center
  justify-content center
  width 46px
  height 46px
  -webkit-tap-highlight-color transparent
  border: 1px solid transparent;
  border-image url('~assets/textures/noise.png') 30 / 1px round

  &.selectable
    cursor pointer

  img
    height 100%
    width auto

  .highlight
    height 90%
    width 90%
    border-radius 4px
    align-self center
    justify-self center

    &.b
      background-color rgba(10, 9, 9, 0.25)

    &.w
      background-color rgba(255, 255, 255, 0.20)

@media (max-width: 375px)
  .box
    width 36px
    height 36px
</style>
