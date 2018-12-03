<template>
  <span>&nbsp;</span>
</template>

<script>
export default {
  name: 'Reset',
  transition: 'fade',
  mounted() {
    this.$store.commit('resetState');
    this.$router.push('/game');
  },
};
</script>
