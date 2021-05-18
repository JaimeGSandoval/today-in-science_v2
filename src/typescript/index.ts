import '../sass/styles.scss';
import { ArticleAPI, subjects } from './model/ArticleService/index';
import { TwitterAPI } from './model/TwitterService';
import Controller from './controller/Controller';
import { View } from './view/';

const articleService: ArticleAPI = new ArticleAPI();
const twitterService: TwitterAPI = new TwitterAPI();
const view: View = new View();

export const controller: Controller = new Controller(
  articleService,
  twitterService,
  view
);

controller.start();

function addListeners(arg: any) {
  const temp = document.getElementById(arg);
  temp?.addEventListener('click', async function (e) {
    document.getElementById('mobile-sidenav-container')!.style.display = 'none';
    const test = e.target as HTMLHeadingElement;
    const articles = await controller.getAllArticles(test.id);
    return view.createArticles(articles);
  });
}

Object.values(subjects).forEach((subject) => {
  addListeners(subject);
});

// TEST
