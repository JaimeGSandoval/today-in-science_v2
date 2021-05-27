export const sidenavDisplay = () => {
  const sidenav = document.getElementById('mobile-sidenav-container');
  if (sidenav?.style.display === 'block') {
    return (sidenav.style.display = 'none');
  }

  sidenav!.style.display = 'block';
};

export const hamburgerMenu = document.getElementById('hamburger-menu-icon');
hamburgerMenu!.addEventListener('click', sidenavDisplay);

export const closeBtn = document.getElementById('closebtn');
closeBtn!.addEventListener('click', sidenavDisplay);

export const mobileSideNave = document.getElementById(
  'mobile-sidenav-container'
);
mobileSideNave!.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;

  if (target!.id === 'mobile-sidenav-container') {
    document.getElementById(target.id)!.style.display = 'none';
  }
});
