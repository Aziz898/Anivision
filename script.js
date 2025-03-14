document.addEventListener("DOMContentLoaded", () => {
  console.log("AniVision with extended sections, overlays, language switch, top bar icons");

  // SPLASH SCREEN
  const splashScreen = document.getElementById('splash-screen');
  setTimeout(() => {
    splashScreen.style.animation = 'fadeOut 0.7s forwards';
    setTimeout(() => {
      splashScreen.style.display = 'none';
    }, 700);
  }, 2000);

  // AUTO-ROTATE Hero Carousel
  const heroCarousel = document.getElementById('hero-carousel');
  const slides = heroCarousel.querySelectorAll('.hero-slide');
  let currentIndex = 0;

  // Показать первый слайд
  slides[currentIndex].classList.add('active');

  function nextHeroSlide() {
    const currentSlide = slides[currentIndex];
    currentSlide.classList.remove('active');
    currentSlide.classList.add('prev');

    currentIndex = (currentIndex + 1) % slides.length;
    const newSlide = slides[currentIndex];
    newSlide.classList.remove('next','prev');
    newSlide.classList.add('active');

    setTimeout(() => {
      currentSlide.classList.remove('prev');
    }, 800);
  }

  setInterval(nextHeroSlide, 5000);

  // Кнопка языка (RU/EN)
  const langBtn = document.querySelector('.lang-btn');
  const translations = {
    en: {
      trending: "Trending",
      continueWatching: "Continue Watching",
      upcoming: "Upcoming",
      recommendations: "Recommendations",
      continueReading: "Continue Reading"
    },
    ru: {
      trending: "В тренде",
      continueWatching: "Продолжить просмотр",
      upcoming: "Скоро выйдет",
      recommendations: "Рекомендации",
      continueReading: "Продолжить чтение"
    }
  };
  let currentLang = 'en'; // по умолчанию

  // Элементы, которые будем переводить
  const trendingTitle       = document.getElementById('trending-title');
  const cwTitle1           = document.getElementById('continue-watching-title');
  const upcomingTitle      = document.getElementById('upcoming-title');
  const recTitle           = document.getElementById('recommendations-title');
  const continueReadingTitle = document.getElementById('continue-reading-title');

  langBtn?.addEventListener('click', () => {
    // Переключаем язык
    currentLang = (currentLang === 'en') ? 'ru' : 'en';

    // Меняем текст в нужных элементах
    if(trendingTitle) trendingTitle.textContent = translations[currentLang].trending;
    if(cwTitle1) cwTitle1.textContent = translations[currentLang].continueWatching;
    if(upcomingTitle) upcomingTitle.textContent = translations[currentLang].upcoming;
    if(recTitle) recTitle.textContent = translations[currentLang].recommendations;
    if(continueReadingTitle) continueReadingTitle.textContent = translations[currentLang].continueReading;

    alert("Язык переключен на " + (currentLang === 'en' ? "English" : "Русский"));
  });

  // Уведомления
  const notifBtn = document.querySelector('.notif-btn');
  notifBtn?.addEventListener('click', () => {
    alert("Уведомления пока не реализованы!");
  });
});
