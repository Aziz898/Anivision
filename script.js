// Firebase v8 SDK (для простоты, используем старую нотацию)
var firebaseConfig = {
  apiKey: "AIzaSyBrgoL47GPj30GHYkNBEBQyj3ddflFVXfI",
  authDomain: "anivision-194f5.firebaseapp.com",
  projectId: "anivision-194f5",
  storageBucket: "anivision-194f5.appspot.com",
  messagingSenderId: "793506779659",
  appId: "1:793506779659:web:b391b63343af935afbed0e",
  measurementId: "G-JGNDHJT219"
};
// Инициализация Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var storage = firebase.storage();

// Функция для fade-out splash screen
window.addEventListener('load', function() {
  setTimeout(function() {
    var splash = document.getElementById('splash-screen');
    splash.style.opacity = 0;
    setTimeout(function() {
      splash.style.display = 'none';
    }, 700);
  }, 2000);
});

// Языковой переключатель
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
  document.querySelector('[data-i18n="navHome"]').textContent = translations[currentLang].navHome;
  document.querySelector('[data-i18n="navAnime"]').textContent = translations[currentLang].navAnime;
  document.querySelector('[data-i18n="navManga"]').textContent = translations[currentLang].navManga;
  document.querySelector('[data-i18n="navProfile"]').textContent = translations[currentLang].navProfile;
  // Можно обновить и другие элементы, если они имеют data-i18n
}
document.getElementById("lang-btn").addEventListener("click", function() {
  currentLang = (currentLang === "ru") ? "en" : "ru";
  applyTranslations();
  alert("Язык переключен на " + (currentLang === "ru" ? "Русский" : "English"));
});
applyTranslations();

// Уведомления: модальное окно
var notifModal = document.getElementById("notif-modal");
var notifBtn = document.getElementById("notif-btn");
var notifClose = document.getElementById("notif-close");
notifBtn.addEventListener("click", function() {
  notifModal.style.display = "block";
});
notifClose.addEventListener("click", function() {
  notifModal.style.display = "none";
});
window.addEventListener("click", function(event) {
  if (event.target == notifModal) {
    notifModal.style.display = "none";
  }
});

// HERO-карусель
function loadCarousel() {
  db.collection("carouselBanners").get().then(function(querySnapshot) {
    var carousel = document.getElementById("hero-carousel");
    carousel.innerHTML = "";
    var slides = [];
    querySnapshot.forEach(function(doc) {
      var data = doc.data();
      var slide = document.createElement("div");
      slide.className = "slide fade-in";
      slide.style.backgroundImage = "url('" + data.image + "')";
      // Создаем overlay с кнопкой
      var overlay = document.createElement("div");
      overlay.className = "hero-overlay";
      var btn = document.createElement("a");
      btn.href = data.link || "#";
      btn.textContent = translations[currentLang].watchNow;
      overlay.appendChild(btn);
      slide.appendChild(overlay);
      carousel.appendChild(slide);
      slides.push(slide);
    });
    if (slides.length > 0) {
      slides[0].classList.add("active", "visible");
      var currentIndex = 0;
      setInterval(function() {
        slides[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add("active");
      }, 5000);
    }
  }).catch(function(error) {
    console.error("Ошибка при загрузке карусели:", error);
  });
}
loadCarousel();

// Функция для загрузки аниме в секцию Trending
function loadTrending() {
  db.collection("anime").where("sections", "array-contains", "trending").get().then(function(querySnapshot) {
    var container = document.getElementById("trending-container");
    container.innerHTML = "";
    querySnapshot.forEach(function(doc) {
      var data = doc.data();
      var card = document.createElement("a");
      card.className = "anime-card";
      card.href = "#"; // ссылка на подробную страницу аниме
      var img = document.createElement("img");
      img.src = data.cover || "https://via.placeholder.com/200x300?text=No+Image";
      img.alt = data.title;
      card.appendChild(img);
      var title = document.createElement("div");
      title.className = "anime-title";
      title.textContent = data.title;
      card.appendChild(title);
      container.appendChild(card);
    });
  }).catch(function(error) {
    console.error("Ошибка при загрузке Trending:", error);
  });
}
loadTrending();

// Можно добавить функции для других секций аналогично…
