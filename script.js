document.addEventListener("DOMContentLoaded", () => {
  console.log("Anivision loaded");

  // ========================
  //          ТЕМА
  // ========================
  const body = document.querySelector('body');
  // Ищем все чекбоксы-переключатели темы
  const themeToggles = [
    document.getElementById('theme-toggle-checkbox'),
    document.getElementById('theme-toggle-checkbox-profile'),
    document.getElementById('theme-toggle-checkbox-player'),
    document.getElementById('theme-toggle-checkbox-settings'),
    document.getElementById('theme-toggle-checkbox-mylist'),
    document.getElementById('theme-toggle-checkbox-chat')
  ];

  // Устанавливаем тему
  function setTheme(isLight) {
    if (isLight) {
      body.classList.add('light-theme');
    } else {
      body.classList.remove('light-theme');
    }
  }
  // Проверяем, сохранена ли тема
  const savedTheme = localStorage.getItem('anivision-theme'); // 'light' / 'dark' / null
  setTheme(savedTheme === 'light');

  // Функция-обработчик переключения
  function handleThemeToggle(e) {
    const checked = e.target.checked;
    if (checked) {
      localStorage.setItem('anivision-theme', 'light');
      setTheme(true);
    } else {
      localStorage.setItem('anivision-theme', 'dark');
      setTheme(false);
    }
  }

  // Инициализируем чекбоксы на всех страницах
  themeToggles.forEach(checkbox => {
    if (!checkbox) return;
    checkbox.checked = (savedTheme === 'light');
    checkbox.addEventListener('change', handleThemeToggle);
  });


  // ========================
  //   АВТОРИЗАЦИЯ (ЛОГИН/РЕГИСТРАЦИЯ)
  // ========================
  // Сохраняем пользователя в localStorage
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nickname = document.getElementById('reg-nickname').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = document.getElementById('reg-password').value.trim();

      const userData = { nickname, email, password };
      localStorage.setItem('anivision-user', JSON.stringify(userData));
      alert("Аккаунт создан!");
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
        alert("Пользователь не найден!");
        return;
      }
      const userData = JSON.parse(savedUser);
      if (userData.email === email && userData.password === password) {
        localStorage.setItem('anivision-loggedin', 'true');
        alert("Добро пожаловать!");
        window.location.href = "profile.html";
      } else {
        alert("Неверные данные!");
      }
    });
  }

  // Профиль
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

  // Отображение ника в sidebar (index.html)
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


  // ========================
  //     НАСТРОЙКИ
  // ========================
  const notifCheckbox = document.getElementById('notif-checkbox');
  const fontSizeSelect = document.getElementById('font-size-select');
  const chatDarkmodeCheckbox = document.getElementById('chat-darkmode-checkbox');
  const saveSettingsBtn = document.getElementById('save-settings-btn');

  // Загружаем настройки из localStorage
  function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('anivision-settings')) || {};
    if (notifCheckbox) notifCheckbox.checked = !!settings.notifications;
    if (fontSizeSelect) fontSizeSelect.value = settings.fontSize || "100%";
    if (chatDarkmodeCheckbox) chatDarkmodeCheckbox.checked = !!settings.chatDark;
    // Применяем размер шрифта ко всему body
    if (settings.fontSize) {
      body.style.fontSize = settings.fontSize;
    }
  }
  loadSettings();

  // Сохраняем настройки
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', () => {
      const settings = {
        notifications: notifCheckbox.checked,
        fontSize: fontSizeSelect.value,
        chatDark: chatDarkmodeCheckbox.checked
      };
      localStorage.setItem('anivision-settings', JSON.stringify(settings));
      // Применяем сразу
      body.style.fontSize = settings.fontSize;
      alert("Настройки сохранены!");
    });
  }


  // ========================
  //      МОЙ СПИСОК
  // ========================
  const mylistAddBtn = document.getElementById('mylist-add-btn');
  const mylistAnimeTitle = document.getElementById('mylist-anime-title');
  const mylistContainer = document.getElementById('mylist-container');

  function loadMyList() {
    const list = JSON.parse(localStorage.getItem('anivision-mylist')) || [];
    return list;
  }
  function saveMyList(list) {
    localStorage.setItem('anivision-mylist', JSON.stringify(list));
  }
  function renderMyList() {
    if (!mylistContainer) return;
    mylistContainer.innerHTML = "";
    const list = loadMyList();
    list.forEach((anime, index) => {
      const li = document.createElement('li');
      li.style.marginBottom = "0.5rem";
      li.textContent = anime;
      // Кнопка удалить
      const removeBtn = document.createElement('button');
      removeBtn.textContent = "X";
      removeBtn.style.marginLeft = "1rem";
      removeBtn.addEventListener('click', () => {
        list.splice(index, 1);
        saveMyList(list);
        renderMyList();
      });
      li.appendChild(removeBtn);
      mylistContainer.appendChild(li);
    });
  }
  if (mylistContainer) {
    renderMyList();
  }
  if (mylistAddBtn) {
    mylistAddBtn.addEventListener('click', () => {
      const title = mylistAnimeTitle.value.trim();
      if (!title) {
        alert("Введите название аниме!");
        return;
      }
      const list = loadMyList();
      list.push(title);
      saveMyList(list);
      renderMyList();
      mylistAnimeTitle.value = "";
    });
  }


  // ========================
  //         ЧАТ
  // ========================
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');

  function loadChat() {
    return JSON.parse(localStorage.getItem('anivision-chat')) || [];
  }
  function saveChat(messages) {
    localStorage.setItem('anivision-chat', JSON.stringify(messages));
  }
  function renderChat() {
    if (!chatMessages) return;
    chatMessages.innerHTML = "";
    const messages = loadChat();
    messages.forEach(msg => {
      const div = document.createElement('div');
      div.classList.add('chat-message');
      // Отображаем ник
      const userSpan = document.createElement('span');
      userSpan.classList.add('chat-user');
      userSpan.textContent = msg.user + ": ";
      // Текст сообщения
      const textSpan = document.createElement('span');
      textSpan.textContent = msg.text;
      div.appendChild(userSpan);
      div.appendChild(textSpan);
      chatMessages.appendChild(div);
    });
    // Прокручиваем вниз
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  if (chatMessages) {
    renderChat();
  }
  if (chatSendBtn) {
    chatSendBtn.addEventListener('click', () => {
      const text = chatInput.value.trim();
      if (!text) return;
      const loggedIn = localStorage.getItem('anivision-loggedin') === 'true';
      let userName = "Гость";
      if (loggedIn) {
        const savedUser = JSON.parse(localStorage.getItem('anivision-user'));
        if (savedUser) {
          userName = savedUser.nickname;
        }
      }
      const messages = loadChat();
      messages.push({ user: userName, text });
      saveChat(messages);
      chatInput.value = "";
      renderChat();
    });
  }


  // ========================
  //  Пример обработчика «Подробнее» в баннере
  // ========================
  const bannerLearnBtn = document.getElementById('banner-learn-btn');
  if (bannerLearnBtn) {
    bannerLearnBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert("Подробная информация о 'Магическая битва (2 сезон)' в разработке!");
    });
  }

});
