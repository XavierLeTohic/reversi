<template>
  <div class="container">
    <div>
      <div>
        Blancs {{ whiteTokens }}
      </div>
    </div>
    <div class="board__container">
      <Board />
    </div>
    <div>
      <div>
        Noirs {{ blackTokens }}
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState, mapGetters } from 'vuex';

import Board from '../components/Board.vue';

export default {
  name: 'Game',
  components: {
    Board,
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
  background-image radial-gradient(circle, #59c76d, #4eb163, #449a59, #3b854f, #337045)

  > div
    flex 1
    z-index 1
    align-items center
    justify-content center
    display flex

  .board__container
    flex 2
</style>
