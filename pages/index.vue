<template>
  <div class="container">
    <div>
      Opponent score
    </div>
    <div class="board__container">
      <Board />
    </div>
    <div>
      Your score
    </div>
  </div>
</template>

<script>
import Board from '../components/Board.vue';

export default {
  name: 'Index',
  components: {
    Board,
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

  > div
    flex 1
    width 100%

  .board__container
    flex 2
    width 50%

@media (max-width: 768px)
  .container .board__container
    width 70%
@media (max-width: 570px)
  .container .board__container
    width 90%
</style>
