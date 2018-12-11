<template>
  <div class="container">
    <div class="board">
      <Board :readonly="true" />
    </div>

    <div class="stats">
      <div v-if="hasEquality" class="status__label">
        Equality
        <div class="status__emoji" v-html="twemoji.parse('🤝')" />
      </div>
      <div v-if="!hasEquality && didUserWin" class="status__label">
        You win
        <div class="status__emoji" v-html="twemoji.parse('👏')" />
      </div>
      <div v-if="!hasEquality && !didUserWin" class="status__label">
        You loose
        <div class="status__emoji" v-html="twemoji.parse('😭')" />
      </div>

      <div class="actions">
        <button @click="newGame">
          <span class="button__emoji">⚔️</span> New game
        </button>
        <button class="button__secondary" @click="backHome">
          <span class="button__emoji">🔙</span> Home
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState, mapGetters } from 'vuex';
import twemoji from 'twemoji';

import Board from '../components/Board.vue';

export default {
  name: 'Results',
  transition: 'fade',
  components: {
    Board,
  },
  data() {
    return {
      twemoji,
    };
  },
  computed: {
    ...mapState([
      'board',
      'color',
    ]),
    ...mapGetters([
      'blackTokens',
      'whiteTokens',
    ]),
    userTokens() {
      if (this.color === 'b') {
        return this.blackTokens;
      }

      return this.whiteTokens;
    },
    opponentTokens() {
      return this.color === 'b' ? this.whiteTokens : this.blackTokens;
    },
    didUserWin() {
      // User win or equality
      if (this.opponentTokens < this.userTokens || this.opponentTokens === this.userTokens) {
        return true;
      }
      return false;
    },
    hasEquality() {
      return this.opponentTokens === this.userTokens;
    },
  },
  methods: {
    newGame() {
      this.$router.push('/reset');
    },
    backHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="stylus">
.status__emoji img.emoji
  height 34px
  width auto
</style>


<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 350ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.container
  display flex
  flex-direction column
  align-items center
  justify-content space-between
  height 100%
  color white

  .stats
    flex 2

  .board
    flex 1
    display flex
    align-items center
    justify-content center

.stats
  .status__label
    text-align center
    font-size 27px
    font-weight bold
    text-transform uppercase
    text-shadow 0px 2px 2px rgba(0, 0, 0, 0.4)

  .status__emoji
    font-size 34px
    margin-top 10px

.actions
  display flex
  flex-direction column
  align-items center
  justify-content center
  margin-top 30px

@media (max-width: 570px)
  .stats
    .status__label
      font-size 21px
    .status__emoji
      margin-top 5px
      font-size 28px

  .container .board
    flex 1.4

  .actions
    margin-top 20px

</style>
