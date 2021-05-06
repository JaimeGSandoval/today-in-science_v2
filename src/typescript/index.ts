import '../sass/styles.scss';
import { ArticleAPI } from './model/ArticleService/index';
import { TwitterAPI } from './model/TwitterService';
import Controller from './controller/Controller';
import { View } from './view/';
const articleService: ArticleAPI = new ArticleAPI();
const twitterService: TwitterAPI = new TwitterAPI();
const view: View = new View();
const controller: Controller = new Controller(
  articleService,
  twitterService,
  view
);
controller.start();
