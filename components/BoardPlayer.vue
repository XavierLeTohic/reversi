<template>
  <div :class="{ player__container: true, top }">
    <div v-if="!isAi" class="player__description">
      <div class="emoji">{{ emoji }}</div>
      <div class="name">{{ name }}</div>
    </div>
    <div v-if="isAi" class="player__description">
      <div class="emoji">🤖</div>
      <div class="name">Robot</div>
    </div>
    <div class="tokens">
      <span :class="{ token: true, [color]: true }" /> x {{ score }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardPlayer',
  props: {
    level: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
    emoji: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    top: {
      type: Boolean,
      default: false,
    },
    isAi: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="stylus" scoped>
.player__container
  display flex
  justify-content space-between
  align-content flex-start
  width 100%
  margin-top 15px
  text-transform uppercase
  font-weight bold
  text-shadow 0px 2px 2px rgba(0, 0, 0, 0.4)

  /* Player on the top of the screen */
  &.top
    align-content center
    flex-direction row-reverse
    margin-top 0
    margin-bottom 15px

    .player__description
      flex-direction row-reverse

      .name
        margin-right 10px

.player__description
  display flex

  .name
    margin-left 10px
    font-size 13px

  .emoji
    font-size 34px

.player__description .emoji,
.player__description .name,
.tokens
  display flex
  align-items center

.token
  display inline-block
  height 23px
  width 23px
  border-radius 50%
  margin 0 5px
  box-shadow 0px 2px 2px rgba(0, 0, 0, 0.4)

  &.black
    background-color #000000

  &.white
    background-color #ffffff
</style>
