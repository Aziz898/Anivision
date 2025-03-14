document.addEventListener("DOMContentLoaded", () => {
  console.log("Anivision: iOS scroll fix + alt images");

  const splashScreen = document.getElementById('splash-screen');

  // Показываем splash 2 секунды, потом плавно скрываем
  setTimeout(() => {
    splashScreen.style.animation = "fadeOut 0.7s forwards";
    setTimeout(() => {
      splashScreen.style.display = "none";
    }, 700);
  }, 2000);

  // Обработка клика по меню
  const menuBtn = document.querySelector(".menu-btn");
  menuBtn?.addEventListener("click", () => {
    alert("Меню в разработке...");
  });
});
