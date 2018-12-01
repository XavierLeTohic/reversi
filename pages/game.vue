<template>
  <div class="container">
    <div class="container__top">
      <div class="player opponent">
        <BoardPlayer
          :top="true"
          :level="2"
          :score="opponentScore"
          :color="color === 'w' ? 'black' : 'white'"
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
          :level="3"
          :score="playerScore"
          :color="color === 'w' ? 'white' : 'black'"
          name="Xavier"
          emoji="🐶"
        />
      </div>
    </div>
    <transition :name="bannerTransition">
      <TurnBanner v-if="showNextTurnBanner" />
    </transition>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState, mapGetters } from 'vuex';

import Board from '../components/Board.vue';
import BoardPlayer from '../components/BoardPlayer.vue';
import TurnBanner from '../components/TurnBanner.vue';

export default {
  name: 'Game',
  components: {
    Board,
    BoardPlayer,
    TurnBanner,
  },
  computed: {
    ...mapState([
      'board',
      'player',
      'color',
      'showNextTurnBanner',
    ]),
    ...mapGetters([
      'whiteTokens',
      'blackTokens',
    ]),
    bannerTransition() {
      return this.player === this.color ? 'banner-player' : 'banner';
    },
    opponentScore() {
      if (this.color === 'b') {
        return this.whiteTokens;
      }
      return this.blackTokens;
    },
    playerScore() {
      if (this.color === 'b') {
        return this.blackTokens;
      }
      return this.whiteTokens;
    },
  },
};
</script>

<style lang="stylus" scoped>
.container
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
    max-width 420px

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

.banner-enter-active, .banner-leave-active,
.banner-player-enter-active, .banner-player-leave-active, {
  transition: transform 300ms, opacity 300ms;
}

.banner-enter, .banner-leave-to {
  transform: translateY(-100%)
  opacity 0;
}

.banner-player-enter, .banner-player-leave-to {
  transform: translateY(100%)
  opacity 0;
}

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
