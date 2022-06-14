const scrollTopBtn = document.querySelector('.scrolltop');
const WINDOW_SCROLL_POSSITION = 100;

scrollTopBtn.addEventListener('click', handleClick);

function handleClick() {
  window.scroll({ top: 0, left: 0, behavior: 'smooth' });
}

document.addEventListener('scroll', () => {
  let scrolled = window.scrollY;
  console.log(scrolled);
  if (scrolled < WINDOW_SCROLL_POSSITION) {
    scrollTopBtn.classList.remove('showed');
  } else {
    scrollTopBtn.classList.add('showed');
  }
});
