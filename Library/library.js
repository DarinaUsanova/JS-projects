console.log(`
1. Task: https://github.com/rolling-scopes-school/tasks/blob/master/tasks/library/library-part2.md
\n
2. Deploy: (https://rolling-scopes-school.github.io/darinausanova-JSFEPRESCHOOL2023Q2/Library/)
\n
3. Done 12.08.2023 / deadline 14.08.2023
\n
4. Score 50/50`);

//Burger handler
(function () {
  const burgerItem = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  const menuCloseItem = document.querySelector('.nav__cross');
  const menuItems = document.querySelectorAll('.nav__list');
  
  burgerItem.addEventListener('click', () => {
    menu.classList.add('menu_active');
  });
  
  menuCloseItem.addEventListener('click', () => {
    menu.classList.remove('menu_active');
  });
  
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      menu.classList.remove('menu_active');
    });
  });
  document.addEventListener('click', (event) => {
    const targetElement = event.target;
  
    // Check if the target element is not inside the menu or burgerItem
    if (!menu.contains(targetElement) && !burgerItem.contains(targetElement)) {
      menu.classList.remove('menu_active');
      document.removeEventListener('click', closeMenu);
    }
  });
})();
//dropmenu profile no auth
(function () {
  const userIcon = document.querySelector('.menu__icon');
  const modalNoAuth = document.querySelector('.modal');
  const modalLogin = document.getElementById('modal_login');

  userIcon.addEventListener('click', toggleModal);

  function toggleModal() {
    if (modalLogin.classList.contains('open')) {
      modalNoAuth.classList.remove('modal_active');
    } else {
      modalNoAuth.classList.toggle('modal_active');
    }

    if (modalNoAuth.classList.contains('modal_active')) {
      window.addEventListener('click', closeOnClickOutside);
    } else {
      window.removeEventListener('click', closeOnClickOutside);
    }
  }

  function closeOnClickOutside(event) {
    if (!userIcon.contains(event.target) && !modalNoAuth.contains(event.target)) {
      modalNoAuth.classList.remove('modal_active');
      window.removeEventListener('click', closeOnClickOutside);
    }
  }
})();

// Log-in modal window open 
document.getElementById('drop-menu_btn-Login').addEventListener('click',function() {
  document.getElementById('modal_login').classList.add('open');
// Close modal_active if open
  document.querySelector('.modal.modal_active').classList.remove('modal_active');
});
// Log-in modal window open - log-in btn
document.getElementById('login-btn').addEventListener('click',function() {
  document.getElementById('modal_login').classList.add('open');
});
//Lig-in modal window open on buy_btn IF user not loged in

// Log-in modal window close
document.getElementById('login_svg-close').addEventListener('click',function() {
  document.getElementById('modal_login').classList.remove('open');
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('modal_login').classList.remove('open');
  }
});

document.querySelector('#modal_login .modal_box').addEventListener('click', event => {
  event.stopPropagation(); 
});

document.querySelector('#modal_login').addEventListener('click', event => {
  if (event.target.id === 'modal_login') {
    document.querySelector('#modal_login').classList.remove('open');
  }
});
//Register modal window open
document.getElementById('drop-menu_btn-Register').addEventListener('click',function() {
  document.getElementById('modal_register').classList.add('open');
  // Close modal_active if open
  document.querySelector('.modal.modal_active').classList.remove('modal_active');
});
// Register modal window open - signe - up btn
document.getElementById('signup-btn').addEventListener('click',function() {
  document.getElementById('modal_register').classList.add('open');
});
//Register modal window close
document.getElementById('login_svg-close-register').addEventListener('click',function() {
  document.getElementById('modal_register').classList.remove('open');
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('modal_register').classList.remove('open');
  }
});

document.querySelector('#modal_register .modal_box').addEventListener('click', event => {
  event.stopPropagation(); 
});

document.querySelector('#modal_register').addEventListener('click', event => {
  if (event.target.id === 'modal_register') {
    document.querySelector('#modal_register').classList.remove('open');
  }
});
//Carousel
const galleryBox = document.querySelector('.gallery-box');
const galleryItems = document.querySelectorAll('.gallery__item');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const paginationBtns = document.querySelectorAll('.pagination__btn');

let currentIndex = 0;

function showSlide(index) {
  galleryItems.forEach(item => {
    item.classList.remove('active');
  });

  galleryItems[index].classList.add('active');
}

function updatePagination(index) {
  paginationBtns.forEach(btn => {
    btn.classList.remove('active');
  });

  paginationBtns[index].classList.add('active');
}

leftBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  showSlide(currentIndex);
  updatePagination(currentIndex);
});

rightBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  showSlide(currentIndex);
  updatePagination(currentIndex);
});

paginationBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    currentIndex = index;
    showSlide(currentIndex);
    updatePagination(currentIndex);
  });
});

// Initial setup
showSlide(currentIndex);
updatePagination(currentIndex);












