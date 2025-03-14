document.addEventListener("DOMContentLoaded", () => {
  console.log("Anivision MiniApp with splash screen");

  const splashScreen = document.getElementById('splash-screen');

  // Имитация, что через 2 сек splash пропадает
  setTimeout(() => {
    // Добавим анимацию "fadeOut" (создана, но не применена) - можно сделать и по-другому
    splashScreen.style.animation = "fadeOut 0.7s forwards";
    // Удалим splash через 0.7s
    setTimeout(() => {
      splashScreen.style.display = "none";
    }, 700);
  }, 2000);

  // Пример: обработка клика по меню
  const menuBtn = document.querySelector(".menu-btn");
  menuBtn?.addEventListener("click", () => {
    alert("Меню в разработке...");
  });
});
