import '../sass/styles.scss';
import { ArticleAPI } from './model/ArticleService/index';
import { TwitterAPI } from './model/TwitterService';
import Controller from './controller/Controller';

const articleService: ArticleAPI = new ArticleAPI();
const twitterService: TwitterAPI = new TwitterAPI();
const controller: Controller = new Controller(articleService, twitterService);
controller.start();
// controller.getAllArticles();
// controller.getAllTweets();

// function () {
//   var model = new TaskModel(),
//     view = new TaskView(model),
//     controller = new TaskController(model, view);
// };
