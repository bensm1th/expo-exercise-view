// const arr = [1, 2, 3, 4, 5, 6, 7, 8];
// const logThis = arr.some(num => num === 8);

// console.log(logThis);

// import daggy from 'daggy';
const daggy = require('daggy');
const R = require('ramda');
const Task = require('data.task');

const { map, compose, prop, lift } = R;

const makeUrl = term => 
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&type=video&q=${term}&key=xxxx`;

const VideoJSON = {
  "id": {
    "kind": "youtube#video",
    "videoId": "9Q7Vr3yQYWQ"
  },
  "snippet": {
    "title": "Led Zeppelin - Stairway to Heaven Live (HD)",

    "thumbnails": {
      "high": {
        "url": { thumbnail: "https://i.ytimg.com/vi/9Q7Vr3yQYWQ/hqdefault.jpg"}
      },
    },
  },
};


//creates a new constructor
const Video = daggy.tagged('id', 'thumbnail', 'url', 'title');

// destructures the json and feeds the props to the constructor
const toVideo = json => {
  const {
    id: { videoId },
    snippet: { thumbnails: { high: { url: thumbnail } }, title }
  } = json;
  return Video(videoId, thumbnail, `https://www.youtube.com/watch?v=${videoId}`, title);
};
//array of video json objects
const videoResponse = { items: [VideoJSON, VideoJSON, VideoJSON, VideoJSON]};
//takes a transformation function and outputs a new function (a transducer) that can map to make the transformation
const mapVideos = map(toVideo);
//takes a transformation function (mapVideos) and outputs a transducer (toVideos) which will give an array of Video objects
const toVideos = compose(mapVideos, prop('items'));
//console.log(toVideos(videoResponse));
const httpGet = (url) =>
  new Task((rej, res) =>
    fetch(url)
      // Since json() returns another promise,
      // we need to chain it down to the resolve function.
      .then((resp) =>
        resp.json().then(res)
      )
      .catch(rej)
  );
//the params: 1) toVideos is a transducer that will output an array of Video Objects
//2) httpGet will fetch the JSON object for us
//3)makeUrl will take the search term and place it in a URL that can be called
//the compose function performs RIGHT to LEFT composition, which seems counter intuitive
export const searchVideos = compose(lift(toVideos), httpGet, makeUrl);

// Note: I am using Haskell's type declaration notation in the comments above the functions 
// (e.g. toVideo :: JSON -> Video). It describes the input and output of the declared function.
