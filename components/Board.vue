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
        <transition name="fade">
          <div
            v-if="col === 'b'"
            class="token token__black"
          />
          <div
            v-if="col === 'w'"
            class="token token__white"
          />
        </transition>
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
import { mapState, mapActions, mapGetters } from 'vuex';

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
    ...mapActions([
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
  box-shadow inset 0px 0px 10px -2px #000000
  border 1px solid rgba(0, 0, 0, 0.38)
  border-radius 4px

.row
  display flex
  max-width 368px

  .box
    &:first-child
      border-image-width 1px 1px 1px 0

    &:last-child
      border-image-width 1px 0 1px 1px

  &:first-child .box
    border-image-width 0 1px 1px 1px

    &:first-child
      border-image-width 0 1px 1px 0

    &:last-child
      border-image-width 0 0 1px 1px

  &:last-child .box
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
  border-image url('~assets/textures/noise.png') 30 / 1px round
  border-style solid

  &.selectable
    cursor pointer

  .highlight
    height 80%
    width 80%
    border-radius 4px
    align-self center
    justify-self center

    &.b
      background-color rgba(10, 9, 9, 0.3)

    &.w
      background-color rgba(255, 255, 255, 0.3)

.token
  height 70%
  width 70%
  border-radius 50%
  align-self center

  &.token__black
    background-color #353535

  &.token__white
    background-color #fdfdfd

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 375px)
  .box
    width 36px
    height 36px
</style>
