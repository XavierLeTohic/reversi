/* global FBInstant */
// import Vue from 'vue';

export default ({ store }) => {
  FBInstant.initializeAsync().then(async () => FBInstant.startGameAsync().then(async () => {
    const id = await FBInstant.player.getID();
    const name = await FBInstant.player.getName();
    console.log(id, name);

    let userEmoji = '🦊';

    try {
      await FBInstant.player.getDataAsync(['emoji'])
        .then(({ emoji }) => {
          if (emoji) {
            userEmoji = emoji;
          }
        });
    } catch (err) {
      console.log(err);
    }

    store.commit('setUserName', name);
    store.commit('setEmoji', userEmoji);
    console.log('✅ Game started');
  }));
};
