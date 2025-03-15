/* ---------- Firebase инициализация (v8) ---------- */
var firebaseConfig = {
  apiKey: "AIzaSyBrgoL47GPj30GHYkNBEBQyj3ddflFVXfI",
  authDomain: "anivision-194f5.firebaseapp.com",
  projectId: "anivision-194f5",
  storageBucket: "anivision-194f5.appspot.com",
  messagingSenderId: "793506779659",
  appId: "1:793506779659:web:b391b63343af935afbed0e",
  measurementId: "G-JGNDHJT219"
};
// Инициализация
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var storage = firebase.storage();

/* ---------- Splash Screen (fade-out) ---------- */
window.addEventListener('load', function() {
  setTimeout(function() {
    var splash = document.getElementById('splash-screen');
    splash.classList.add('hidden'); // плавное исчезновение через transition
    setTimeout(function() {
      splash.style.display = 'none'; // убираем из потока
    }, 700); // 0.7s соответствует transition в CSS
  }, 2000);
});

/* ---------- Переключение языка (RU ↔ EN) ---------- */
var translations = {
  en: {
    trendingTitle: "Trending",
    navHome: "Home",
    navAnime: "Anime",
    navManga: "Manga",
    navProfile: "Profile",
    watchNow: "Watch Now"
  },
  ru: {
    trendingTitle: "Популярное",
    navHome: "Главная",
    navAnime: "Аниме",
    navManga: "Манга",
    navProfile: "Профиль",
    watchNow: "Смотреть"
  }
};
var currentLang = "ru";
function applyTranslations() {
  document.querySelector('[data-i18n="trendingTitle"]').textContent = translations[currentLang].trendingTitle;
  document.querySelector('[data-i18n="navHome"]').innerHTML = `<i class="fas fa-home"></i><span class="nav-label">${translations[currentLang].navHome}</span>`;
  document.querySelector('[data-i18n="navAnime"]').innerHTML = `<i class="fas fa-film"></i><span class="nav-label">${translations[currentLang].navAnime}</span>`;
  document.querySelector('[data-i18n="navManga"]').innerHTML = `<i class="fas fa-book"></i><span class="nav-label">${translations[currentLang].navManga}</span>`;
  document.querySelector('[data-i18n="navProfile"]').innerHTML = `<i class="fas fa-user"></i><span class="nav-label">${translations[currentLang].navProfile}</span>`;
  // Если есть другие тексты, тоже обновите
}
// Кнопка смены языка
document.getElementById('lang-btn').addEventListener('click', function() {
  currentLang = (currentLang === 'ru') ? 'en' : 'ru';
  applyTranslations();
  alert("Язык переключен на " + (currentLang === 'ru' ? "Русский" : "English"));
});
applyTranslations();

/* ---------- Модальное окно Уведомлений ---------- */
var notifModal = document.getElementById('notif-modal');
var notifBtn = document.getElementById('notif-btn');
var notifClose = document.getElementById('notif-close');
notifBtn.addEventListener('click', function() {
  notifModal.style.display = 'block';
});
notifClose.addEventListener('click', function() {
  notifModal.style.display = 'none';
});
window.addEventListener('click', function(e) {
  if (e.target === notifModal) {
    notifModal.style.display = 'none';
  }
});

/* ---------- Hero-карусель (автопрокрутка) ---------- */
function loadCarousel() {
  var carouselElem = document.getElementById('hero-carousel');
  carouselElem.innerHTML = '';
  db.collection('carouselBanners').get().then(function(querySnapshot) {
    var slides = [];
    querySnapshot.forEach(function(doc) {
      var data = doc.data();
      var slide = document.createElement('div');
      slide.className = 'slide';
      // Устанавливаем фон слайду
      if (data.image) {
        slide.style.backgroundImage = `url("${data.image}")`;
      }
      // Overlay с кнопкой "Смотреть"
      var overlay = document.createElement('div');
      overlay.className = 'hero-overlay';
      var link = document.createElement('a');
      link.href = data.link || '#';
      link.textContent = translations[currentLang].watchNow;
      overlay.appendChild(link);
      slide.appendChild(overlay);
      carouselElem.appendChild(slide);
      slides.push(slide);
    });
    // Если есть хотя бы 1 слайд, активируем первый
    if (slides.length > 0) {
      slides[0].classList.add('active');
      var currentIndex = 0;
      setInterval(function() {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
      }, 5000);
    }
  }).catch(function(error) {
    console.error("Ошибка при загрузке карусели:", error);
  });
}

/* ---------- Секция Trending (пример) ---------- */
function loadTrending() {
  var trendingContainer = document.getElementById('trending-container');
  trendingContainer.innerHTML = '';
  // Получаем аниме, у которых "sections" содержит "trending"
  db.collection("anime").where("sections", "array-contains", "trending").get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var data = doc.data();
        var card = document.createElement('a');
        card.className = 'anime-card';
        card.href = '#'; // ссылка на подробную страницу, если нужно
        var img = document.createElement('img');
        img.src = data.cover || "https://via.placeholder.com/140x210?text=No+Image";
        img.alt = data.title || 'Anime Title';
        card.appendChild(img);
        var title = document.createElement('div');
        title.className = 'anime-title';
        title.textContent = data.title || 'No Title';
        card.appendChild(title);
        trendingContainer.appendChild(card);
      });
    })
    .catch(function(error) {
      console.error("Ошибка при загрузке Trending:", error);
    });
}

// Запуск при загрузке
window.addEventListener('DOMContentLoaded', function() {
  loadCarousel();
  loadTrending();
  // Если нужны другие секции (continue watching, recommendations), добавьте их вызовы
});
