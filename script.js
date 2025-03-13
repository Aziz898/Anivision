// script.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Anivision loaded");

  // ========================
  //       ТЕМА (слайдер)
  // ========================
  const body = document.querySelector('body');
  const themeToggleCheckboxes = [
    document.getElementById('theme-toggle-checkbox'),
    document.getElementById('theme-toggle-checkbox-profile'),
    document.getElementById('theme-toggle-checkbox-player')
  ];

  // Функция для установки темы
  function setTheme(isLight) {
    if (isLight) {
      body.classList.add('light-theme');
    } else {
      body.classList.remove('light-theme');
    }
  }

  // Проверяем localStorage на наличие сохранённой темы
  const savedTheme = localStorage.getItem('theme'); // "light" или "dark" или null
  if (savedTheme === 'light') {
    setTheme(true);
  } else {
    setTheme(false);
  }

  // Обработчик переключения
  function handleThemeToggle(e) {
    const checked = e.target.checked;
    if (checked) {
      setTheme(true);
      localStorage.setItem('theme', 'light');
    } else {
      setTheme(false);
      localStorage.setItem('theme', 'dark');
    }
  }

  // Вешаем слушатели на все чекбоксы (где они есть)
  themeToggleCheckboxes.forEach(checkbox => {
    if (!checkbox) return; // если на странице нет этого элемента
    // Устанавливаем начальное положение
    checkbox.checked = (savedTheme === 'light');
    // Добавляем обработчик
    checkbox.addEventListener('change', handleThemeToggle);
  });


  // ========================
  //   ИМИТАЦИЯ АВТОРИЗАЦИИ
  // ========================
  // Сохраняем данные о пользователе в localStorage при регистрации
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nickname = document.getElementById('reg-nickname').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = document.getElementById('reg-password').value.trim();

      // Сохраняем в localStorage (демо-версия, без защиты)
      const userData = {
        nickname,
        email,
        password
      };
      localStorage.setItem('anivision-user', JSON.stringify(userData));
      alert("Аккаунт создан! Можете войти.");
      window.location.href = "login.html";
    });
  }

  // Логин
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value.trim();

      const savedUser = localStorage.getItem('anivision-user');
      if (!savedUser) {
        alert("Пользователь не зарегистрирован!");
        return;
      }

      const userData = JSON.parse(savedUser);
      if (userData.email === email && userData.password === password) {
        // Успешный вход
        localStorage.setItem('anivision-loggedin', 'true');
        alert("Вы вошли в систему!");
        window.location.href = "profile.html";
      } else {
        alert("Неверные данные для входа!");
      }
    });
  }

  // Проверка профиля
  const profileTitle = document.getElementById('profile-title');
  const profileUsername = document.getElementById('profile-username');
  const profileEmail = document.getElementById('profile-email');
  const logoutBtn = document.getElementById('logout-btn');

  if (profileTitle) {
    const loggedIn = localStorage.getItem('anivision-loggedin') === 'true';
    if (!loggedIn) {
      alert("Вы не авторизованы! Переходим на страницу входа...");
      window.location.href = "login.html";
    } else {
      // Отображаем данные
      const savedUser = JSON.parse(localStorage.getItem('anivision-user'));
      if (savedUser) {
        profileUsername.textContent = savedUser.nickname || "NoName";
        profileEmail.textContent = savedUser.email || "NoEmail";
      }
    }
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('anivision-loggedin');
      alert("Вы вышли из аккаунта.");
      window.location.href = "index.html";
    });
  }

  // ========================
  //  Отображение ника в sidebar (index.html)
  // ========================
  const sidebarUsername = document.getElementById('sidebar-username');
  if (sidebarUsername) {
    const loggedIn = localStorage.getItem('anivision-loggedin') === 'true';
    if (loggedIn) {
      const savedUser = JSON.parse(localStorage.getItem('anivision-user'));
      if (savedUser) {
        sidebarUsername.textContent = savedUser.nickname;
      }
    } else {
      sidebarUsername.textContent = "Гость";
    }
  }
});
