// // const arr = [1, 2, 3, 4, 5, 6, 7, 8];
// // const logThis = arr.some(num => num === 8);

// // console.log(logThis);

// // import daggy from 'daggy';
// const daggy = require('daggy');
// const R = require('ramda');
// const Task = require('data.task');

// const { map, compose, prop, lift } = R;

// const makeUrl = term => 
//     `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&type=video&q=${term}&key=xxxx`;

// const VideoJSON = {
//   "id": {
//     "kind": "youtube#video",
//     "videoId": "9Q7Vr3yQYWQ"
//   },
//   "snippet": {
//     "title": "Led Zeppelin - Stairway to Heaven Live (HD)",

//     "thumbnails": {
//       "high": {
//         "url": { thumbnail: "https://i.ytimg.com/vi/9Q7Vr3yQYWQ/hqdefault.jpg"}
//       },
//     },
//   },
// };


// //creates a new constructor
// const Video = daggy.tagged('id', 'thumbnail', 'url', 'title');

// // destructures the json and feeds the props to the constructor
// const toVideo = json => {
//   const {
//     id: { videoId },
//     snippet: { thumbnails: { high: { url: thumbnail } }, title }
//   } = json;
//   return Video(videoId, thumbnail, `https://www.youtube.com/watch?v=${videoId}`, title);
// };
// //array of video json objects
// const videoResponse = { items: [VideoJSON, VideoJSON, VideoJSON, VideoJSON]};
// //takes a transformation function and outputs a new function (a transducer) that can map to make the transformation
// const mapVideos = map(toVideo);
// //takes a transformation function (mapVideos) and outputs a transducer (toVideos) which will give an array of Video objects
// const toVideos = compose(mapVideos, prop('items'));
// //console.log(toVideos(videoResponse));
// const httpGet = (url) =>
//   new Task((rej, res) =>
//     fetch(url)
//       // Since json() returns another promise,
//       // we need to chain it down to the resolve function.
//       .then((resp) =>
//         resp.json().then(res)
//       )
//       .catch(rej)
//   );
// //the params: 1) toVideos is a transducer that will output an array of Video Objects
// //2) httpGet will fetch the JSON object for us
// //3)makeUrl will take the search term and place it in a URL that can be called
// //the compose function performs RIGHT to LEFT composition, which seems counter intuitive
// export const searchVideos = compose(lift(toVideos), httpGet, makeUrl);

// // Note: I am using Haskell's type declaration notation in the comments above the functions 
// // (e.g. toVideo :: JSON -> Video). It describes the input and output of the declared function.
// const lines = [181, 29, 36, 140, 80, 140, 30, 66, 69, 53, 
// 91, 58, 100, 50, 103, 64, 60, 47, 54, 70, 65, 87, 155, 
// 97, 87, 35, 66, 91, 65, 232, 124, 149, 245, 181];

// const sum = lines.reduce((init, curr) => {
//   return init + curr;
// }, 0);

// console.log(sum);
// const response = 
// {"data":{"_id":"59022fc5fd30c23410c4bf90",
// "pointsEarned":0,"name":"Use this ","description":"It has sets for the exercises. ","__v":0,
// "exercises":
// [{"_id":"59022fc5fd30c23410c4bf8c","exerciseInfo":"58ebd3ec8065ea2b6474e9b4","__v":0,
// "pointsEarned":0,"sets":[{"_id":"59022fc5fd30c23410c4bf88","__v":0,"goals":{"weight":225,"number":12}},
// {"_id":"59022fc5fd30c23410c4bf89","__v":0,"goals":{"weight":225,"number":12}}]},

// {"_id":"59022fc5fd30c23410c4bf8b","exerciseInfo":"58ebd3e28065ea2b6474e9b3","__v":0,"pointsEarned":0,
// "sets":[{"_id":"59022fc5fd30c23410c4bf87","__v":0,"goals":{"weight":225,"number":5}}]},

// {"_id":"59022fc5fd30c23410c4bf8e","exerciseInfo":"58e3eadcd10b783aacb02936","__v":0,"pointsEarned":0,
// "sets":[{"_id":"59022fc5fd30c23410c4bf81","__v":0,"goals":{"weight":135,"number":12}},
// {"_id":"59022fc5fd30c23410c4bf82","__v":0,"goals":{"weight":135,"number":12}},
// {"_id":"59022fc5fd30c23410c4bf83","__v":0,"goals":{"weight":135,"number":12}}]},

// {"_id":"59022fc5fd30c23410c4bf8d","exerciseInfo":"58e3ebab2ec5511de8f11cc3","__v":0,"pointsEarned":0,
// "sets":[{"_id":"59022fc5fd30c23410c4bf84","__v":0,"goals":{"weight":220,"number":10}},
// {"_id":"59022fc5fd30c23410c4bf85","__v":0,"goals":{"weight":220,"number":10}},
// {"_id":"59022fc5fd30c23410c4bf86","__v":0,"goals":{"weight":220,"number":10}}]},

// {"_id":"59022fc5fd30c23410c4bf8f","exerciseInfo":"58ebd3fc8065ea2b6474e9b5","__v":0,"pointsEarned":0,
// "sets":[{"_id":"59022fc5fd30c23410c4bf8a","__v":0,"goals":{"weight":225,"number":8}}]
// }]}}


// const sets = response.exercises.map(exercise => {
//         return exercise.sets.map(set => {
//             return set;
//         });
//     });

// cosole.log(sets);
// const v4 = require('uuid').v4;

// const v4s = [];
// for (let i = 0; i < 100; i++) {
//     v4s.push(v4());
// }
// console.log(v4s);

let _null;
const _undefined = undefined;

console.log(_null === null);
console.log(_null == null);
