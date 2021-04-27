import './api/ArticleService/index';

// NASA
// fetch('https://twitter32.p.rapidapi.com/getTweets?user_id=11348282', {
//   method: 'GET',
//   headers: {
//     'x-rapidapi-key': '6bb1f7d518mshee6c717c3746b3ap119550jsned3e9335e862',
//     'x-rapidapi-host': 'twitter32.p.rapidapi.com',
//   },
// })
//   .then((response) => response.json())
//   .then((twitterData) => {
//     const tweets = twitterData.data.tweets;
//     let counter = 0;
//     for (const tweet in tweets) {
//       // console.log(tweets[tweet]);
//       if (tweets[tweet].favorite_count && tweets[tweet].entities.media) {
//         console.log('IMAGE URL: ', tweets[tweet].entities.media[0].media_url);
//         console.log('FULL TEXT: ', tweets[tweet].full_text);
//         console.log('FAVORITE COUNT: ', tweets[tweet].favorite_count);
//         console.log('REPLY COUNT: ', tweets[tweet].reply_count);
//         console.log('RETWEET COUNT: ', tweets[tweet].retweet_count);
//         console.log('\n');
//         counter++;
//       }
//     }
//     console.log(counter);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Space X
// fetch('https://twitter32.p.rapidapi.com/getTweets?user_id=21436960', {
//   method: 'GET',
//   headers: {
//     'x-rapidapi-key': '6bb1f7d518mshee6c717c3746b3ap119550jsned3e9335e862',
//     'x-rapidapi-host': 'twitter32.p.rapidapi.com',
//   },
// })
//   .then((response) => response.json())
//   .then((twitterData) => {
//     // console.log(twitterData);
//     const tweets = twitterData.data.tweets;
//     let counter = 0;
//     for (const tweet in tweets) {
//       // console.log(tweets[tweet]);
//       // if (tweets[tweet].entities.media) {
//       //   console.log(tweets[tweet].entities.media[0].media_url);
//       // }
//       if (tweets[tweet].favorite_count && tweets[tweet].entities.media) {
//         console.log('IMAGE URL: ', tweets[tweet].entities.media[0].media_url);
//         console.log('FULL TEXT: ', tweets[tweet].full_text);
//         console.log('FAVORITE COUNT: ', tweets[tweet].favorite_count);
//         console.log('REPLY COUNT: ', tweets[tweet].reply_count);
//         console.log('RETWEET COUNT: ', tweets[tweet].retweet_count);
//         console.log('\n');
//         counter++;
//       }
//     }
//     console.log(counter);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
