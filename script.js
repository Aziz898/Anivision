document.addEventListener("DOMContentLoaded", () => {
  console.log("AniVision final version with single wide banner, 2x Continue Watching, Recommendations, 4 tabs");

  // SPLASH SCREEN
  const splashScreen = document.getElementById('splash-screen');
  setTimeout(() => {
    splashScreen.style.animation = 'fadeOut 0.7s forwards';
    setTimeout(() => {
      splashScreen.style.display = 'none';
    }, 700);
  }, 2000);

  // Языковая кнопка (заглушка)
  const langBtn = document.querySelector('.lang-btn');
  langBtn?.addEventListener('click', () => {
    alert("Выбор языка: RU / EN (в разработке)");
  });

  // Уведомления
  const notifBtn = document.querySelector('.notif-btn');
  notifBtn?.addEventListener('click', () => {
    alert("Уведомления пока не реализованы!");
  });
});
