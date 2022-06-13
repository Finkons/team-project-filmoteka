import refs from './refs';

console.log(refs);

refs.libraryBtnWatched.addEventListener('click', WatchedBtnAction);
refs.libraryBtnQueue.addEventListener('click', QueueBtnAction);

function WatchedBtnAction(e) {
  const currentButton = e.target;

  refs.libraryBtnQueue.classList.remove('active');
  currentButton.classList.add('active');
}

function QueueBtnAction(e) {
  const currentButton = e.target;

  refs.libraryBtnWatched.classList.remove('active');
  currentButton.classList.add('active');
}
