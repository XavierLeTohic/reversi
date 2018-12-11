<template>
  <div class="container mode__selection">
    <div class="wrapper">
      <h2>Select a mode:</h2>
      <button @click="setMode('ai')">
        <span v-html="twemoji.parse('🤖')" /> Against a robot
      </button>
      <button @click="setMode('friend')">
        <span v-html="twemoji.parse('👥')" /> Play with a friend
      </button>
      <button @click="setMode('online')">
        <span v-html="twemoji.parse('🌍')" /> Multiplayer online
      </button>
      <button @click="setMode('screen')">
        <span v-html="twemoji.parse('📱')" /> Share the screen
      </button>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapMutations } from 'vuex';
import twemoji from 'twemoji';

export default {
  name: 'Mode',
  transition: 'fade',
  data() {
    return {
      twemoji,
    };
  },
  mounted() {
    // Reset the states to be sure that the game start correctly
    this.$store.commit('resetState');
  },
  methods: {
    ...mapMutations([
      'playAgainstAI',
      'playOnline',
      'playWithSharedScreen',
    ]),
    setMode(mode) {
      if (mode === 'ai') {
        this.playAgainstAI();
      } else if (mode === 'online') {
        this.playOnline();
      } else if (mode === 'screen') {
        this.playWithSharedScreen();
      }

      this.$router.push('/game');
    },
  },
};
</script>

<style lang="stylus">
.mode__selection img.emoji
  height 45px
  width auto
</style>


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
  color white

  .wrapper
    width 100%

  h2
    text-align center
    margin-bottom 20px
    text-shadow 0px 2px 2px rgba(0, 0, 0, 0.4)

  button
    width 100%
    max-width 250px
    margin 20px 0
    margin 20px auto
    font-size 14px
</style>
