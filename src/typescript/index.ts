import '../sass/styles.scss';
import './controller/nav-control';
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

const addListeners = (arg: any) => {
  const subjects = document.querySelectorAll(`[data-subject=${arg}]`);

  subjects!.forEach((item) => {
    item.addEventListener('click', async function (e: any) {
      document.getElementById('mobile-sidenav-container')!.style.display =
        'none';
      document.getElementById('loader')!.style.display = 'block';

      const subjectClicked = e.target as HTMLElement;
      const articles = await controller.getAllArticles(
        subjectClicked.dataset.subject!
      );
      return view.createArticles(articles);
    });
  });
};

Object.values(subjects).forEach((subject) => {
  addListeners(subject);
});

controller.start();
