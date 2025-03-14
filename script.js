document.addEventListener("DOMContentLoaded", () => {
  console.log("AniVision MiniApp loaded");

  const splashScreen = document.getElementById('splash-screen');

  // Показываем splash screen 2 секунды, затем плавно скрываем его
  setTimeout(() => {
    splashScreen.style.animation = "fadeOut 0.7s forwards";
    setTimeout(() => {
      splashScreen.style.display = "none";
    }, 700);
  }, 2000);

  // Обработка клика по кнопке меню
  const menuBtn = document.querySelector(".menu-btn");
  menuBtn?.addEventListener("click", () => {
    alert("Меню в разработке...");
  });
});
