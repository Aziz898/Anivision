document.addEventListener("DOMContentLoaded", () => {
  console.log("Anivision with alt tags & scroll fix");

  const splashScreen = document.getElementById('splash-screen');

  // Имитация, что через 2 сек splash пропадает
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
