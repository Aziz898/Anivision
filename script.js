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
document.addEventListener("DOMContentLoaded", () => {
  // ... остальной код ...

  // ============================
  // HERO-КАРУСЕЛЬ
  // ============================
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroLeftArrow = document.getElementById('hero-arrow-left');
  const heroRightArrow = document.getElementById('hero-arrow-right');
  let heroCurrentSlide = 0;
  let heroAutoSlideInterval;

  function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  }

  function nextHeroSlide() {
    heroCurrentSlide = (heroCurrentSlide + 1) % heroSlides.length;
    showHeroSlide(heroCurrentSlide);
  }
  function prevHeroSlide() {
    heroCurrentSlide = (heroCurrentSlide - 1 + heroSlides.length) % heroSlides.length;
    showHeroSlide(heroCurrentSlide);
  }

  if (heroLeftArrow && heroRightArrow && heroSlides.length > 0) {
    heroLeftArrow.addEventListener('click', prevHeroSlide);
    heroRightArrow.addEventListener('click', nextHeroSlide);
    // Запускаем авто-прокрутку каждые 5 секунд
    heroAutoSlideInterval = setInterval(nextHeroSlide, 5000);
    // Начально показываем первый слайд
    showHeroSlide(heroCurrentSlide);
  }

  // ============================
  // КАРУСЕЛЬ "ТОПОВЫЕ АНИМЕ"
  // ============================
  const topAnimeCarousel = document.getElementById('top-anime-carousel');
  const topAnimeLeft = document.getElementById('top-anime-left');
  const topAnimeRight = document.getElementById('top-anime-right');

  if (topAnimeCarousel && topAnimeLeft && topAnimeRight) {
    topAnimeLeft.addEventListener('click', () => {
      topAnimeCarousel.scrollBy({ left: -220, behavior: 'smooth' });
    });
    topAnimeRight.addEventListener('click', () => {
      topAnimeCarousel.scrollBy({ left: 220, behavior: 'smooth' });
    });
  }

  // ============================
  // КАРУСЕЛЬ "ПОДБОРКИ"
  // ============================
  const collectionsCarousel = document.getElementById('collections-carousel');
  const collectionsLeft = document.getElementById('collections-left');
  const collectionsRight = document.getElementById('collections-right');

  if (collectionsCarousel && collectionsLeft && collectionsRight) {
    collectionsLeft.addEventListener('click', () => {
      collectionsCarousel.scrollBy({ left: -220, behavior: 'smooth' });
    });
    collectionsRight.addEventListener('click', () => {
      collectionsCarousel.scrollBy({ left: 220, behavior: 'smooth' });
    });
  }

  // ... остальная логика (тема, авторизация и т.д.) ...
  
});
document.addEventListener("DOMContentLoaded", () => {
  // ... уже существующий код (тема, авторизация, чат и т.д.) ...

  // =========================
  //  ЛОГИКА АДМИН-ПАНЕЛИ
  // =========================

  // Функции для работы со списком аниме
  function loadAnimeList() {
    return JSON.parse(localStorage.getItem('anivision-anime-list')) || [];
  }
  function saveAnimeList(list) {
    localStorage.setItem('anivision-anime-list', JSON.stringify(list));
  }

  // Ссылки на элементы
  const adminAnimeForm = document.getElementById('admin-anime-form');
  const animeTitle = document.getElementById('anime-title');
  const animeDesc = document.getElementById('anime-desc');
  const animeImage = document.getElementById('anime-image');
  const animeCategory = document.getElementById('anime-category');
  const animeIdField = document.getElementById('anime-id');

  const adminAnimeTable = document.getElementById('admin-anime-table');
  const adminCancelBtn = document.getElementById('admin-cancel-btn');

  // Если мы на admin.html
  if (adminAnimeForm && adminAnimeTable) {
    // Отображаем таблицу
    renderAdminTable();

    // Обработка сохранения (добавления / редактирования)
    adminAnimeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const list = loadAnimeList();

      const idValue = animeIdField.value.trim();
      const titleValue = animeTitle.value.trim();
      const descValue = animeDesc.value.trim();
      const imageValue = animeImage.value.trim();
      const categoryValue = animeCategory.value;

      // Если idValue пуст, значит добавляем новое аниме
      if (!idValue) {
        // Генерируем ID
        const newId = Date.now().toString(); // упрощённо
        const newAnime = {
          id: newId,
          title: titleValue,
          desc: descValue,
          image: imageValue,
          category: categoryValue
        };
        list.push(newAnime);
      } else {
        // Редактируем существующее
        const index = list.findIndex(item => item.id === idValue);
        if (index !== -1) {
          list[index].title = titleValue;
          list[index].desc = descValue;
          list[index].image = imageValue;
          list[index].category = categoryValue;
        }
      }

      saveAnimeList(list);
      alert("Сохранено!");
      clearAdminForm();
      renderAdminTable();
    });

    // Кнопка "Отмена"
    adminCancelBtn.addEventListener('click', () => {
      clearAdminForm();
    });
  }

  // Очистка формы
  function clearAdminForm() {
    animeIdField.value = "";
    animeTitle.value = "";
    animeDesc.value = "";
    animeImage.value = "";
    animeCategory.value = "";
  }

  // Отображение таблицы
  function renderAdminTable() {
    const list = loadAnimeList();
    const tbody = adminAnimeTable.querySelector('tbody');
    tbody.innerHTML = "";

    list.forEach(item => {
      const tr = document.createElement('tr');
      const tdTitle = document.createElement('td');
      const tdCategory = document.createElement('td');
      const tdActions = document.createElement('td');

      tdTitle.textContent = item.title || "(Без названия)";
      tdCategory.textContent = item.category || "(Нет категории)";

      // Кнопка "Редактировать"
      const editBtn = document.createElement('button');
      editBtn.classList.add('btn', 'btn-watch');
      editBtn.textContent = "Редактировать";
      editBtn.style.marginRight = "0.5rem";
      editBtn.addEventListener('click', () => {
        // Заполняем форму для редактирования
        animeIdField.value = item.id;
        animeTitle.value = item.title;
        animeDesc.value = item.desc;
        animeImage.value = item.image;
        animeCategory.value = item.category || "";
      });

      // Кнопка "Удалить"
      const delBtn = document.createElement('button');
      delBtn.classList.add('btn', 'btn-learn');
      delBtn.textContent = "Удалить";
      delBtn.addEventListener('click', () => {
        const confirmDel = confirm("Удалить аниме из списка?");
        if (confirmDel) {
          const newList = loadAnimeList().filter(x => x.id !== item.id);
          saveAnimeList(newList);
          renderAdminTable();
        }
      });

      tdActions.appendChild(editBtn);
      tdActions.appendChild(delBtn);

      tr.appendChild(tdTitle);
      tr.appendChild(tdCategory);
      tr.appendChild(tdActions);
      tbody.appendChild(tr);
    });
  }

  // =========================
  // ДИНАМИЧЕСКОЕ ОТОБРАЖЕНИЕ
  // НА ГЛАВНОЙ (index.html)
  // =========================

  // Пример: если на index.html, динамически наполняем карусели
  const topAnimeCarousel = document.getElementById('top-anime-carousel');
  const collectionsCarousel = document.getElementById('collections-carousel');

  if (topAnimeCarousel && collectionsCarousel) {
    const list = loadAnimeList();
    // Фильтруем по категориям
    const topAnime = list.filter(item => item.category === 'top');
    const collections = list.filter(item => item.category === 'collections');

    // Очищаем старые "заглушки"
    topAnimeCarousel.innerHTML = "";
    collectionsCarousel.innerHTML = "";

    // Рендерим "Топ аниме"
    topAnime.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('carousel-item');
      div.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <p>${item.title}</p>
      `;
      topAnimeCarousel.appendChild(div);
    });

    // Рендерим "Подборки"
    collections.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('carousel-item');
      div.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <p>${item.title}</p>
      `;
      collectionsCarousel.appendChild(div);
    });
  }
});
