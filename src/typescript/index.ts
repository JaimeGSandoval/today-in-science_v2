import './api/index';

// async function load() {
//   const response = await fetch("https://google-search3.p.rapidapi.com/api/v1/news/q=president+united+states", {
//     "method": "GET",
//     "headers": {
//       "x-rapidapi-key": "6bb1f7d518mshee6c717c3746b3ap119550jsned3e9335e862",
//       "x-rapidapi-host": "google-search3.p.rapidapi.com"
//     }
//   })
//   const data = await response.json();
//   console.log(data);
// }
// load();

// fetch(
//   'https://google-news1.p.rapidapi.com/search?q=Astronomy&lang=en&pageSize=30',
//   {
//     method: 'GET',
//     headers: {
//       'x-rapidapi-key': '6bb1f7d518mshee6c717c3746b3ap119550jsned3e9335e862',
//       'x-rapidapi-host': 'google-news1.p.rapidapi.com',
//     },
//   }
// )
//   .then((response) => response.json())
//   .then((data) => {
//     const temp = data.articles.slice(0, 30);
//     temp.forEach((article) => {
//       console.log(article);
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });
