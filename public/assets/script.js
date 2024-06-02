document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.querySelector('.flex button');
  const closeButton = document.querySelector('.hidden button');
  const mobileMenu = document.querySelector('.hidden');

  if (menuButton && closeButton && mobileMenu) {
    menuButton.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
    });

    closeButton.addEventListener('click', function () {
      mobileMenu.classList.add('hidden');
    });
  } else {
    console.error('One or more elements not found.');
  }
});
