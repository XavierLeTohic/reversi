/* global FBInstant */
FBInstant.initializeAsync().then(() => FBInstant.startGameAsync().then(() => console.log('Game started')));
