// Found from https://www.html5rocks.com/en/tutorials/webaudio/intro/js/buffer-loader.js

function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = [];
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = (url, index) => {
  // Load buffer asynchronously
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  const loader = this;

  request.onload = () => {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      (buffer) => {
        if (!buffer) {
          return;
        }
        loader.bufferList[index] = buffer;
        if ((loader.loadCount + 1) === loader.urlList.length) {
          loader.onload(loader.bufferList);
        }
      },
      (error) => {
        console.error('decodeAudioData error', error);
      },
    );
  };

  request.onerror = (err) => {
    console.log('Error', err);
  };

  request.send();
};

BufferLoader.prototype.load = () => {
  for (let i = 0; i < this.urlList.length; i += 1) {
    this.loadBuffer(this.urlList[i], i);
  }
};

export default BufferLoader;
