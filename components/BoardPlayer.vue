<template>
  <div :class="{ player__container: true, top }">
    <div class="avatar">
      <div class="emoji">{{ emoji }}</div>
      <div class="level">{{ level }}</div>
    </div>
    <div class="name">{{ name }}</div>
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
  },
};
</script>

<style lang="stylus" scoped>
.player__container
  display flex
  margin 10px 0
  width 100%
  padding 10px 15px 0 15px

  &.top
    flex-direction row-reverse

    .avatar
      flex-direction row-reverse

    .emoji
      margin-left 5px
      margin-right 0

    .name
      text-align right
      margin-left 20px
      margin-right 5px

  .avatar
    display flex
    flex-direction row
    justify-content center
    align-items center
    position relative
    height 70px
    width 70px
    border-radius 50%
    text-align center
    font-size 40px

    .emoji
      margin-right 5px

    .level
      align-self flex-start
      position relative
      height 17px
      width 17px
      line-height 17px
      border-radius 50%
      font-weight 100
      font-size 10px
      text-align center
      background-color rgb(47, 147, 231)
      margin-top 12px

  .name
    text-align left
    margin-left 5px
    margin-top 12px

.tokens
  display flex
  width 100%
  padding-top 12px

  .token
    display inline-block
    height 21px
    width 21px
    border-radius 50%
    margin-right 5px
    font-size 13px
    font-weight 300

    &.black
      background-color #353535

    &.white
      background-color #fdfdfd

.player__container:not(.top)
  .tokens
    justify-content flex-end
</style>
