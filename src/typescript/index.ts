import '../sass/styles.scss';
import { ArticleAPI, subjects } from './model/ArticleService/index';
import { TwitterAPI } from './model/TwitterService';
import Controller from './controller/Controller';
import { View } from './view/';
// import { tempSubject } from './view/article-dom-creation';

const articleService: ArticleAPI = new ArticleAPI();
const twitterService: TwitterAPI = new TwitterAPI();
const view: View = new View();

export const controller: Controller = new Controller(
  articleService,
  twitterService,
  view
);

controller.start();

const sidenavDisplay = () => {
  const sidenav = document.getElementById('mobile-sidenav-container');
  if (sidenav?.style.display === 'block') {
    return (sidenav.style.display = 'none');
  }

  sidenav!.style.display = 'block';
};

const hamburgerMenu = document.getElementById('hamburger-menu-icon');
hamburgerMenu!.addEventListener('click', sidenavDisplay);

const closeBtn = document.getElementById('closebtn');
closeBtn!.addEventListener('click', sidenavDisplay);

const mobileSideNave = document.getElementById('mobile-sidenav-container');
mobileSideNave!.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;

  if (target!.id === 'mobile-sidenav-container') {
    document.getElementById(target.id)!.style.display = 'none';
  }
});

const addListeners = (arg: any) => {
  const subjects = document.querySelectorAll(`[data-subject=${arg}]`);

  subjects!.forEach((item) => {
    item.addEventListener('click', async function (e: any) {
      document.getElementById('mobile-sidenav-container')!.style.display =
        'none';
      document.getElementById('loader')!.style.display = 'block';

      const subjectClicked = e.target as HTMLElement;
      const articles = await controller.getAllArticles(subjectClicked.id);
      return view.createArticles(articles);
    });
  });
};

Object.values(subjects).forEach((subject) => {
  addListeners(subject);
});
