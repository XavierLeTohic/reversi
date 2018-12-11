<template>
  <div class="container matching">
    <transition name="fade">
      <div v-if="!error" class="loader" v-html="twemoji.parse('🌐')" />
      <div v-if="error" class="loader">
        <p>{{ errorMessage }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
/* global FBInstant */
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapState } from 'vuex';
import twemoji from 'twemoji';

export default {
  name: 'Matching',
  transition: 'fade',
  data() {
    return {
      twemoji,
      error: false,
      errorMessage: '',
      errorCode: null,
    };
  },
  computed: {
    ...mapState([
      'multiplayer',
      'online',
      'lookingForPlayers',
    ]),
  },
  mounted() {
    if (!this.multiplayer || !this.online || !this.lookingForPlayers) {
      return this.$router.push('/mode');
    }

    this.matchPlayer();

    return true;
  },
  methods: {
    async matchPlayer() {
      const canMatch = await FBInstant.checkCanPlayerMatchAsync();

      console.log(canMatch);

      await FBInstant
        .matchPlayerAsync()
        .then(() => {
          console.log(FBInstant.context.getID());
        })
        .catch((err) => {
          if (err.code === 'USER_INPUT') {
            this.errorMessage = 'You canceled the search!';
            this.errorCode = err.code;
          } else if (err.code === 'NETWORK_FAILURE') {
            this.errorMessage = 'You are not connected to internet!';
            this.errorCode = err.code;
          } else {
            this.errorMessage = 'An unexpected error occured, please try again.';
          }
          this.error = true;
        });
    },
  },
};
</script>

<style lang="stylus">
.container.matching
  img.emoji
    filter brightness(0) invert(1)
    height 20px
    will-change transform
    transform-origin 50% 50%
    animation spinner 1200ms linear infinite

@keyframes spinner
  to
    transform rotate(360deg)
</style>


<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 350ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.container.matching
  height 100%
  width 100%
  max-width 600px
  display flex
  align-items center
  justify-content center
  flex-direction column
  margin auto
  color white

  p
    font-weight bold
    text-shadow 0px 2px 2px rgba(0, 0, 0, 0.4)
    font-size 15px
    text-align center
    padding 0 10px
</style>
