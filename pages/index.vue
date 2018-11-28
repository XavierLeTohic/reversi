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

@media (max-width: 570px)
  .container .board__container
    width 99%

@media (min-width: 570px) and (max-width: 750px)
  .container .board__container
    width 60%

@media (min-width: 750px) and (max-width: 920px)
  .container .board__container
    width 50%

@media (min-width: 920px) and (max-width: 1100px)
  .container .board__container
    width 40%

@media (min-width: 1100px)
  .container .board__container
    width 30%
</style>
