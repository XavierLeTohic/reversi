<template>
  <div class="container">
    <div class="header">
      <button class="outline" @click="$router.push('/')" v-html="twemoji.parse('🔙')" />
      <h2>Select an emoji</h2>
      <span>&nbsp;</span>
    </div>
    <div class="emoji__list">
      <button
        v-for="(emoji, index) in availableEmojis"
        :key="index"
        class="outline"
        @click="setEmoji(emoji)"
        v-html="twemoji.parse(emoji)"
      />
    </div>
  </div>
</template>

<script>
/* global FBInstant */
import twemoji from 'twemoji';

export default {
  name: 'Avatar',
  transition: 'fade',
  data() {
    return {
      twemoji,
      availableEmojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🦁', '🐮', '🐷', '🐽', '🐸', '🐙', '🐵', '🐯', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🐌', '🐞', '🐜', '🕷', '🦂', '🦀', '🐍', '🐢', '🐠', '🐟', '🐡', '🐬', '🐳', '🐋', '🐊', '🐆', '🐅', '🐃', '🐂', '🐄', '🐪', '🐫', '🐘', '🐐', '🐏', '🐑', '🐎', '🐖', '🐀', '🐁', '🐓', '🦃', '🕊', '🐕', '🐩', '🐈', '🐇', '🐿', '🐉', '🐲'],
    };
  },
  methods: {
    async setEmoji(emoji) {
      this.$store.commit('setEmoji', emoji);

      try {
        await FBInstant.player.setDataAsync({ emoji });
      } catch (err) {
        console.log(err);
      }

      this.$router.push('/');
    },
  },
};
</script>

<style lang="stylus">
.emoji__list
  img.emoji
    height 40px
    width auto

.header
  img.emoji
    height 40px
    width auto
    filter brightness(0) invert(1)

@media (max-width: 570px)
  .header
    img.emoji
      height 25px
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

    .header
      display flex
      justify-content space-between
      align-items center
      width 100%
      padding 25px

    h2
      text-shadow 0px 2px 2px rgba(0, 0, 0, 0.4)

    .emoji__list
      display flex
      align-items center
      justify-content space-around
      flex-direction row
      flex-wrap wrap
      overflow-y scroll

      button
        margin 20px
</style>
