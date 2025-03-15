// Изначальные данные контента (эмулируют управляемый из админки контент)
const animeData = {
  featured: [
    {
      title: "Naruto Shippuden",
      description: "The quest of Naruto to become Hokage.",
      image: "https://via.placeholder.com/1200x500/611e8f/ffffff?text=Naruto+Shippuden"
    },
    {
      title: "Chainsaw Man",
      description: "A boy with a chainsaw demon fights devils.",
      image: "https://via.placeholder.com/1200x500/8e44ad/ffffff?text=Chainsaw+Man"
    },
    {
      title: "One Piece",
      description: "Luffy and crew search for the ultimate treasure.",
      image: "https://via.placeholder.com/1200x500/4B0082/ffffff?text=One+Piece"
    }
  ],
  popular: [
    { title: "Naruto", image: "https://via.placeholder.com/150x225/8e44ad/ffffff?text=Naruto" },
    { title: "One Piece", image: "https://via.placeholder.com/150x225/9b59b6/ffffff?text=One+Piece" },
    { title: "Attack on Titan", image: "https://via.placeholder.com/150x225/732d91/ffffff?text=Attack+on+Titan" },
    { title: "Demon Slayer", image: "https://via.placeholder.com/150x225/4B0082/ffffff?text=Demon+Slayer" }
  ],
  new: [
    { title: "Chainsaw Man", image: "https://via.placeholder.com/150x225/8e44ad/ffffff?text=Chainsaw+Man" },
    { title: "Jujutsu Kaisen", image: "https://via.placeholder.com/150x225/9b59b6/ffffff?text=Jujutsu+Kaisen" },
    { title: "My Hero Academia", image: "https://via.placeholder.com/150x225/732d91/ffffff?text=My+Hero+Academia" },
    { title: "Bleach", image: "https://via.placeholder.com/150x225/4B0082/ffffff?text=Bleach" }
  ]
};

// Текущий язык интерфейса (по умолчанию английский)
let currentLang = 'en';
// Таблица переводов интерфейса (EN/RU)
const texts = {
  en: {
    navHome: "Home",
    navAnime: "Anime",
    navMovies: "Movies",
    navAdmin: "Admin",
    sectionPopular: "Popular Anime",
    sectionNew: "New Releases",
    watchNow: "Watch Now"
  },
  ru: {
    navHome: "Главная",
    navAnime: "Аниме",
    navMovies: "Фильмы",
    navAdmin: "Админ",
    sectionPopular: "Популярное аниме",
    sectionNew: "Новые релизы",
    watchNow: "Смотреть сейчас"
  }
};

// Функция применения переводов для указанного языка
function setLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (texts[lang] && texts[lang][key]) {
      el.textContent = texts[lang][key];
    }
  });
}
// Обработчик изменения языка через селектор
document.getElementById('lang-select').addEventListener('change', (e) => {
  setLanguage(e.target.value);
});

// Инициализация перевода (установка языка по умолчанию)
setLanguage(currentLang);

// Вставка слайдов карусели на страницу
const carousel = document.querySelector('.carousel');
const dotsContainer = document.querySelector('.carousel-dots');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Создаем элементы слайдов и точек-индикаторов на основе animeData.featured
animeData.featured.forEach((item, idx) => {
  // Создаем слайд
  const slide = document.createElement('div');
  slide.className = 'slide';
  if (idx === 0) slide.classList.add('active'); // первый слайд активен
  slide.style.backgroundImage = `url('${item.image}')`;
  // Добавляем информацию о слайде (заголовок, описание, кнопка)
  const info = document.createElement('div');
  info.className = 'slide-info';
  // Заголовок и описание
  info.innerHTML = `<h2>${item.title}</h2><p>${item.description}</p>`;
  // Кнопка "Watch Now"
  const btn = document.createElement('button');
  btn.setAttribute('data-i18n', 'watchNow');
  btn.textContent = texts[currentLang].watchNow;
  info.appendChild(btn);
  slide.appendChild(info);
  carousel.insertBefore(slide, dotsContainer); // вставляем слайд перед блоком точек
  // Создаем индикатор-точку для слайда
  const dot = document.createElement('span');
  dot.className = 'dot';
  if (idx === 0) dot.classList.add('active');
  dot.setAttribute('data-index', idx);
  dotsContainer.appendChild(dot);
});

// Настройка переключения слайдов
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// Функция показа конкретного слайда
function showSlide(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  slideIndex = index;
}

// Обработчики кликов по стрелкам
nextBtn.addEventListener('click', () => {
  showSlide(slideIndex + 1);
});
prevBtn.addEventListener('click', () => {
  showSlide(slideIndex - 1);
});

// Обработчики кликов по индикаторам-точкам
dotsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('dot')) {
    const index = parseInt(e.target.getAttribute('data-index'));
    showSlide(index);
  }
});

// Авто-переключение слайдов каждые 5 секунд
setInterval(() => {
  showSlide(slideIndex + 1);
}, 5000);

// Вставка карточек "Популярное аниме"
const popularList = document.querySelector('.popular-list');
animeData.popular.forEach(anime => {
  const card = document.createElement('a');
  card.className = 'anime-card';
  card.href = "#";  /* ссылка на страницу аниме (заглушка) */
  // Изображение постера
  const img = document.createElement('img');
  img.src = anime.image;
  img.alt = anime.title;
  card.appendChild(img);
  // Название
  const title = document.createElement('div');
  title.className = 'anime-title';
  title.textContent = anime.title;
  card.appendChild(title);
  popularList.appendChild(card);
});

// Вставка карточек "Новые релизы"
const newList = document.querySelector('.new-list');
animeData.new.forEach(anime => {
  const card = document.createElement('a');
  card.className = 'anime-card';
  card.href = "#";
  const img = document.createElement('img');
  img.src = anime.image;
  img.alt = anime.title;
  card.appendChild(img);
  const title = document.createElement('div');
  title.className = 'anime-title';
  title.textContent = anime.title;
  card.appendChild(title);
  newList.appendChild(card);
});

// Эффект плавного появления элементов при загрузке
window.addEventListener('load', () => {
  document.querySelectorAll('.fade-in').forEach((el, idx) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 300 * idx);
  });
});

// Показываем ссылку "Admin" если нужно (эмуляция того, что пользователь – админ)
const isAdmin = true;  // изменить на false для не-админа
if (isAdmin) {
  document.querySelector('.admin-link').style.display = 'inline-block';
}
