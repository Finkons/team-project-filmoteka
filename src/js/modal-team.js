(() => {
    const refs = {
      openModalBtn: document.querySelector('[data-modal-team-open]'),
      closeModalBtn: document.querySelector('[data-modal-team-close]'),
      modal: document.querySelector('[data-modal-team]'),
    };
  
    refs.openModalBtn.addEventListener('click', toggleModalTeam);
    refs.closeModalBtn.addEventListener('click', toggleModalTeam);
  
    function toggleModalTeam() {
      document.body.classList.toggle('modal-open');
      refs.modal.classList.toggle('is-hidden');
    }
  })();