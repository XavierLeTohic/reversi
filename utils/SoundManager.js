import BufferLoader from './BufferLoader';

export default class SoundManager {
  constructor(game, contextAudio) {
    this.game = game;
    this.sounds = [];
    this.buffers = [];

    this.sfxVolume = 0.2;
    this.voicesVolume = 0.45;
    this.menuVolume = 0.75;
    this.contextAudioNotSupported = contextAudio === null;
    this.contextAudio = contextAudio;
    this.contextResumed = false;

    this.contextAudio.resume();

    // AudioContext, we should use HTML5 Audio API
    // I had to implement AudioContext because since Chrome 66
    // Autoplay of HTML5 Audio API is not working anymore.
    // My apologize to have not implemented the two APIs.
    if (!this.contextAudioNotSupported) {
      this.bufferListPath = ['sounds/chipLay2.ogg'];

      const bufferLoader = new BufferLoader(
        this.contextAudio,
        this.bufferListPath,
        this.onBufferLoaded,
      );

      bufferLoader.load();
    }
  }

  /**
   * Start a sound
   * @param {String} name Name of the sound based on the filename without extension
   * @param {Boolean} loop Playing the sound in a loop ?
   * @param {Number} volume Volume of the sound from 0 to 1
   */
  start(name, loop = false, volume = 1) {
    if (typeof this.buffers[name] === 'undefined') {
      throw new Error(`Cannot find buffer related to the sound "${name}" `);
    }

    const gainNode = this.contextAudio.createGain();
    gainNode.connect(this.contextAudio.destination);
    gainNode.gain.value = volume;

    const source = this.contextAudio.createBufferSource();
    source.buffer = this.buffers[name];
    source.loop = loop;
    source.connect(gainNode);
    source.start(0);

    this.sounds[name] = {
      source,
      gainNode,
    };
  }

  /**
   * Stop a sound
   * @param {string} name
   */
  stop(name) {
    if (typeof this.sounds[name] === 'undefined') {
      throw new Error(`Sound "${name}" do not exist`);
    }

    this.sounds[name].source.stop();
  }

  /**
   * Set the volume of a sound
   * @param {string} name
   * @param {number} volume
   */
  setVolume(name, volume) {
    if (typeof this.sounds[name] === 'undefined') {
      throw new Error(`Sound "${name}" do not exist`);
    }

    this.sounds[name].gainNode.gain.value = volume;
  }

  onBufferLoaded = (bufferList) => {
    bufferList.forEach((buffer, i) => {
      // Get the sound name from the file path
      const soundName = /([^/]*)\.[^.]*$/.exec(this.bufferListPath[i])[1];
      this.buffers[soundName] = buffer;
    });

    this.start('menu', true, this.menuVolume);
  }
}
