// Импорт Firebase SDK (модульный стиль, версия 11.4.0)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase-конфиг (как указано)
const firebaseConfig = {
  apiKey: "AIzaSyBrgoL47GPj30GHYkNBEBQyj3ddflFVXfI",
  authDomain: "anivision-194f5.firebaseapp.com",
  projectId: "anivision-194f5",
  storageBucket: "anivision-194f5.appspot.com",
  messagingSenderId: "793506779659",
  appId: "1:793506779659:web:b391b63343af935afbed0e",
  measurementId: "G-JGNDHJT219"
};

// Инициализация Firebase и Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// SPLASH SCREEN: fadeOut через 2 секунды
window.addEventListener("load", () => {
  setTimeout(() => {
    const splash = document.getElementById("splash-screen");
    splash.style.opacity = 0;
    setTimeout(() => {
      splash.style.display = "none";
    }, 700);
  }, 2000);
});

// Переключение языка
const translations = {
  en: { trending: "Trending", continue: "Continue Watching", recommendations: "Recommendations", upcoming: "Upcoming", seeAll: "See All", watchNow: "Watch Now" },
  ru: { trending: "Популярное", continue: "Продолжить", recommendations: "Рекомендации", upcoming: "Скоро выйдет", seeAll: "Ещё", watchNow: "Смотреть" }
};
let currentLang = "en";
document.getElementById("lang-btn").addEventListener("click", () => {
  currentLang = (currentLang === "en") ? "ru" : "en";
  document.getElementById("trending-title").textContent = translations[currentLang].trending;
  document.getElementById("continue-title").textContent = translations[currentLang].continue;
  document.getElementById("recommend-title").textContent = translations[currentLang].recommendations;
  document.getElementById("upcoming-title").textContent = translations[currentLang].upcoming;
  document.getElementById("trending-more").textContent = translations[currentLang].seeAll;
  alert("Язык переключен на " + (currentLang === "en" ? "English" : "Русский"));
});
document.getElementById("notif-btn").addEventListener("click", () => {
  alert("Уведомления пока не реализованы!");
});

// Функция для загрузки слайдов HERO-карусели
async function loadCarousel() {
  const carousel = document.getElementById("hero-carousel");
  carousel.innerHTML = "";
  try {
    const carouselCollection = collection(db, "carouselBanners");
    const querySnapshot = await getDocs(carouselCollection);
    const slides = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const slide = document.createElement("div");
      slide.classList.add("hero-slide");
      slide.style.backgroundImage = `url('${data.image}')`;
      slide.innerHTML = `
        <div class="hero-overlay">
          <a href="${data.link || "#"}" target="_blank">${translations[currentLang].watchNow}</a>
        </div>
      `;
      carousel.appendChild(slide);
      slides.push(slide);
    });
    if (slides.length > 0) {
      slides[0].classList.add("active");
      let currentIndex = 0;
      setInterval(() => {
        slides[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add("active");
      }, 5000);
    }
  } catch (error) {
    console.error("Ошибка при загрузке карусели:", error);
  }
}
loadCarousel();

// Функция для загрузки аниме в раздел (по значению поля sections)
async function loadSection(sectionKey, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  try {
    const animeRef = collection(db, "anime");
    const q = query(animeRef, where("sections", "array-contains", sectionKey));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const card = document.createElement("div");
      card.classList.add("row-item");
      const cover = data.cover ? data.cover : "https://via.placeholder.com/200x300?text=No+Image";
      card.innerHTML = `<img class="row-poster" src="${cover}" alt="${data.title || "Anime"}">`;
      container.appendChild(card);
    });
  } catch (error) {
    console.error(`Ошибка при загрузке раздела [${sectionKey}]:`, error);
  }
}
// Загружаем секции
loadSection("trending", "trending-container");
loadSection("continue_watching", "continue-container");
loadSection("recommendations", "recommend-container");
loadSection("upcoming", "upcoming-container");
