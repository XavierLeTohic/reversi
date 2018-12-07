<template>
  <div :class="{ banner__container: true, [currentPlayer === color ? 'player' : 'opponent']: true }">
    <div :class="{ banner: true, [currentPlayer]: true }">
      <span v-if="currentPlayer === color">Your turn</span>
      <span v-if="currentPlayer !== color">Your opponent's turn</span>
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
      'currentPlayer',
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
  top 20px

  .banner
    width auto
    text-align center
    font-weight bold
    border-radius 20px
    font-size 12px
    text-transform uppercase
    padding 10px 20px
    box-shadow 0px 0px 10px -2px #000000
    margin auto

    /* White turn */
    &.w
      background-color #ffffff
      color #000000

    /* Black turn */
    &.b
      background-color #000000
      color #ffffff

  &.opponent .banner
    align-self flex-start

  &.player
    top auto
    bottom 20px

    .banner
      align-self flex-end

</style>
