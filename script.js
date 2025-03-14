document.addEventListener("DOMContentLoaded", () => {
  console.log("Anivision MiniApp with updated tabs");

  const splashScreen = document.getElementById('splash-screen');

  // Имитация, что через 2 сек splash пропадает
  setTimeout(() => {
    // Анимация fadeOut (описана в предыдущем коде)
    splashScreen.style.animation = "fadeOut 0.7s forwards";
    // Удалим splash через 0.7s
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
