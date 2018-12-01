<template>
  <div :class="{ banner__container: true, [player === color ? 'player' : 'opponent']: true }">
    <div :class="{ banner: true, [player]: true }">
      <span v-if="player === color">Your turn</span>
      <span v-if="player !== color">Your opponent's turn</span>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState } from 'vuex';

export default {
  name: 'TurnBanner',
  computed: {
    ...mapState([
      'player',
      'color',
    ]),
  },
};
</script>

<style lang="stylus" scoped>
.banner__container
  position absolute
  display flex
  width 100%
  top 0

  .banner
    height 40px
    width 100%
    line-height 40px
    text-align center
    font-weight bold
    text-transform uppercase
    box-shadow 0px 0px 10px -2px #000000

    /* White turn */
    &.w
      background-color #fdfdfd
      color #353535

    /* Black turn */
    &.b
      background-color #353535
      color #fdfdfd

  &.opponent .banner
    align-self flex-start

  &.player
    top auto
    bottom 0

    .banner
      align-self flex-end

</style>
