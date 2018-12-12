/* global FBInstant */
// import Vue from 'vue';

export default ({ store }) => {
  FBInstant.initializeAsync().then(async () => FBInstant.startGameAsync().then(async () => {
    const id = await FBInstant.player.getID();
    const name = await FBInstant.player.getName();
    const contextID = await FBInstant.context.getID();

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

    console.log(contextID, id, name, userEmoji);

    store.commit('setUserName', name);
    store.commit('setEmoji', userEmoji);
    console.log('✅ Game started');
  }));
};
