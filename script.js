document.addEventListener("DOMContentLoaded", () => {
  console.log("Anivision UI Loaded in Russian");

  // ====== Переключение тем (дневная/ночная) ======
  const body = document.querySelector('body');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');

  // При клике переключаем класс "light-theme"
  themeToggleBtn?.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    if (body.classList.contains('light-theme')) {
      themeToggleBtn.textContent = "Ночная тема";
    } else {
      themeToggleBtn.textContent = "Сменить тему";
    }
  });

  // ====== Кнопка "Войти" ======
  const signinBtn = document.getElementById('signin-btn');
  signinBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Форма входа в разработке!");
  });

  // ====== Кнопка "Подробнее" (в баннере) ======
  const learnMoreBtn = document.getElementById('learn-more-btn');
  learnMoreBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Подробная информация о аниме в разработке!");
  });

  // ====== Обработка кликов в боковом меню ======
  const menuLinks = document.querySelectorAll('.menu-link');
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const action = link.dataset.action;
      alert(`Раздел "${action}" в разработке!`);
    });
  });

  // ====== Обработка быстрых фильтров ======
  const filterLinks = document.querySelectorAll('.filter-link');
  filterLinks.forEach(fLink => {
    fLink.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = fLink.dataset.filter;
      alert(`Фильтр по жанру "${filter}" в разработке!`);
    });
  });
});
