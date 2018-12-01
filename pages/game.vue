<template>
  <div class="container">
    <div class="container__top">
      <div class="player opponent">
        <BoardPlayer
          :score="whiteTokens"
          :top="true"
          :level="2"
          color="white"
          name="Matthias"
          emoji="🦁"
        />
      </div>
    </div>
    <div class="container__board">
      <Board />
    </div>
    <div class="container__bottom">
      <div class="player">
        <BoardPlayer
          :score="whiteTokens"
          :level="3"
          color="black"
          name="Xavier"
          emoji="🐶"
        />
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState, mapGetters } from 'vuex';

import Board from '../components/Board.vue';
import BoardPlayer from '../components/BoardPlayer.vue';

export default {
  name: 'Game',
  components: {
    Board,
    BoardPlayer,
  },
  computed: {
    ...mapState([
      'board',
    ]),
    ...mapGetters([
      'whiteTokens',
      'blackTokens',
    ]),
  },
};
</script>

<style lang="stylus" scoped>
.container
  position relative
  display flex
  flex-direction column
  align-items center
  justify-content space-between
  height 100%
  color white
  background-image radial-gradient(circle, #59c76d, #4eb163, #3e8c51, #2c5437, #000000)

  > div
    flex 1
    z-index 1
    display flex

  .container__board
    flex 2
    align-items center
    width 100%
    justify-content center

  .container__top,
  .container__bottom
    width 100%
    padding 0 20px

.player
  display flex
  width 100%
  justify-content flex-start

  &.opponent
    justify-content: flex-end;

  &.opponent
    align-self flex-end
    display flex

@media (max-width: 375px) and (min-height: 630px)
  .container > div
    flex 1.3

@media (max-width: 375px) and (min-height: 750px)
  .container > div
    flex 1.8

@media (min-width: 375px) and (max-height: 650px)
  .container > div
    flex 0.8

</style>
