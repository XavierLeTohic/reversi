<template>
  <div class="container">
    <h1>Reversi<span class="title__secondary">Moji</span></h1>
    <div class="user">
      <div class="user__emoji">
        🐶
      </div>
      <div class="user__name">
        Xavier
      </div>
    </div>
    <div class="actions">
      <button @click="newGame">
        <span class="button__emoji">⚔️</span> New game
      </button>
    </div>
    <div class="copyright">
      Xavier Le Tohic © 2018 Oakward., all rights reserved.
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  transition: 'fade',
  methods: {
    newGame() {
      // Reset the states to be sure that the game start correctly
      this.$store.commit('resetState');
      this.$router.push('/game');
    },
  },
};
</script>

<style lang="stylus" scoped>
.container
  height 100%
  width 100%
  max-width 600px
  display flex
  align-items center
  justify-content space-around
  flex-direction column
  margin auto

h1
  font-weight bold
  color white

  .title__secondary
    color rgba(0, 0, 0, 0.40)

.user
  display flex
  flex-direction column
  justify-content center
  text-align center

  .user__emoji
    font-size 50px
    line-height 70px
    height 70px
    width 70px
    background-color rgba(0, 0, 0, 0.30)
    border-radius 50%
    text-align center

  .user__name
    font-weight bold
    font-size 14px
    color white
    text-shadow 0px 2px 2px rgba(0, 0, 0, 0.4)
    margin-top 5px

.actions
  margin-top 30px

.copyright
  font-size 9px
  color white
  font-weight bold
  justify-self flex-end
  padding 0 5px
</style>
