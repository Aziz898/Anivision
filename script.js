document.addEventListener("DOMContentLoaded", () => {
  console.log("AniVision final (Anime Track style) with auto-rotating trending carousel");

  // SPLASH SCREEN
  const splashScreen = document.getElementById('splash-screen');
  setTimeout(() => {
    splashScreen.style.animation = 'fadeOut 0.7s forwards';
    setTimeout(() => {
      splashScreen.style.display = 'none';
    }, 700);
  }, 2000);

  // Уведомления
  const notifBtn = document.querySelector('.notif-btn');
  notifBtn?.addEventListener('click', () => {
    alert("Уведомления пока не реализованы!");
  });

  // AUTO-ROTATING TRENDING CAROUSEL
  const carousel = document.getElementById('trending-carousel');
  const slides = carousel.querySelectorAll('.trending-slide');
  let currentIndex = 0;

  // Изначально показываем первый слайд
  slides[currentIndex].classList.add('active');

  // Функция переключения слайда
  function nextSlide() {
    // Текущий слайд
    const currentSlide = slides[currentIndex];
    currentSlide.classList.remove('active');
    currentSlide.classList.add('prev');

    // Вычисляем следующий индекс
    currentIndex = (currentIndex + 1) % slides.length;
    const newSlide = slides[currentIndex];
    newSlide.classList.remove('next', 'prev');
    newSlide.classList.add('active');

    // Через 800ms убираем классы у старого слайда
    setTimeout(() => {
      currentSlide.classList.remove('prev');
    }, 800);
  }

  // Запускаем авто-переключение каждые 5 секунд
  setInterval(nextSlide, 5000);
});
