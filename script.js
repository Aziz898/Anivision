document.addEventListener("DOMContentLoaded", () => {
  console.log("Anivision - new big slides carousel");

  const splashScreen = document.getElementById('splash-screen');

  // Показываем splash 2 секунды
  setTimeout(() => {
    // Запускаем fadeOut
    splashScreen.style.animation = "fadeOut 0.7s forwards";
    // Через 0.7с убираем из DOM
    setTimeout(() => {
      splashScreen.style.display = "none";
    }, 700);
  }, 2000);

  // Клик по кнопке меню
  const menuBtn = document.querySelector(".menu-btn");
  menuBtn?.addEventListener("click", () => {
    alert("Меню в разработке...");
  });
});
