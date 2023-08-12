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
  burgerItem.addEventListener('click', () => {
   menu.classList.add('menu_active');
  });
  menuCloseItem.addEventListener('click', () =>{
    menu.classList.remove('menu_active');
  })
}());