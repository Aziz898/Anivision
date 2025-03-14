document.addEventListener("DOMContentLoaded", () => {
  console.log("AniVision final design loaded");

  const splashScreen = document.getElementById('splash-screen');
  setTimeout(() => {
    splashScreen.style.animation = 'fadeOut 0.7s forwards';
    setTimeout(() => {
      splashScreen.style.display = 'none';
    }, 700);
  }, 2000);

  // Кнопка уведомлений
  const notifBtn = document.querySelector('.notif-btn');
  notifBtn?.addEventListener('click', () => {
    alert('Уведомления: пока не реализовано!');
  });
});
