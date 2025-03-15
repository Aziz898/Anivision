// Firebase SDK (v11.4.0) – модульный синтаксис
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-storage.js";

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBrgoL47GPj30GHYkNBEBQyj3ddflFVXfI",
  authDomain: "anivision-194f5.firebaseapp.com",
  projectId: "anivision-194f5",
  storageBucket: "anivision-194f5.appspot.com",
  messagingSenderId: "793506779659",
  appId: "1:793506779659:web:b391b63343af935afbed0e",
  measurementId: "G-JGNDHJT219"
};

// Инициализация Firebase, Firestore и Storage
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);
const db = getFirestore(appFirebase);
const storage = getStorage(appFirebase);

// Коллекции
const animeCollection = collection(db, "anime");
const carouselCollection = collection(db, "carouselBanners");

// Режим редактирования для аниме (если понадобится)
let editingAnimeId = null;

/* ---------- Переключение языка ---------- */
const translations = {
  en: {
    trendingTitle: "Trending",
    navHome: "Home",
    navAnime: "Anime",
    navManga: "Manga",
    navProfile: "Profile",
    watchNow: "Watch Now"
  },
  ru: {
    trendingTitle: "Популярное",
    navHome: "Главная",
    navAnime: "Аниме",
    navManga: "Манга",
    navProfile: "Профиль",
    watchNow: "Смотреть"
  }
};
let currentLang = "ru";
function applyTranslations() {
  document.querySelector('[data-i18n="trendingTitle"]').textContent = translations[currentLang].trendingTitle;
  document.querySelector('[data-i18n="navHome"]').innerHTML = `<i class="fas fa-home"></i><span class="nav-label">${translations[currentLang].navHome}</span>`;
  document.querySelector('[data-i18n="navAnime"]').innerHTML = `<i class="fas fa-film"></i><span class="nav-label">${translations[currentLang].navAnime}</span>`;
  document.querySelector('[data-i18n="navManga"]').innerHTML = `<i class="fas fa-book"></i><span class="nav-label">${translations[currentLang].navManga}</span>`;
  document.querySelector('[data-i18n="navProfile"]').innerHTML = `<i class="fas fa-user"></i><span class="nav-label">${translations[currentLang].navProfile}</span>`;
}
document.getElementById("lang-btn").addEventListener("click", () => {
  currentLang = currentLang === "ru" ? "en" : "ru";
  applyTranslations();
  alert("Язык переключен на " + (currentLang === "ru" ? "Русский" : "English"));
});
applyTranslations();

/* ---------- Модальное окно уведомлений ---------- */
const notifModal = document.getElementById("notif-modal");
const notifBtn = document.getElementById("notif-btn");
const notifClose = document.getElementById("notif-close");
notifBtn.addEventListener("click", () => {
  notifModal.style.display = "block";
});
notifClose.addEventListener("click", () => {
  notifModal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === notifModal) {
    notifModal.style.display = "none";
  }
});

/* ---------- HERO-карусель ---------- */
function loadCarousel() {
  const carouselElem = document.getElementById("hero-carousel");
  carouselElem.innerHTML = "";
  getDocs(carouselCollection)
    .then((querySnapshot) => {
      const slides = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const slide = document.createElement("div");
        slide.className = "slide";
        if (data.image) {
          slide.style.backgroundImage = `url("${data.image}")`;
        }
        // Overlay с кнопкой "Смотреть"
        const overlay = document.createElement("div");
        overlay.className = "hero-overlay";
        const link = document.createElement("a");
        link.href = data.link || "#";
        link.textContent = translations[currentLang].watchNow;
        overlay.appendChild(link);
        slide.appendChild(overlay);
        carouselElem.appendChild(slide);
        slides.push(slide);
      });
      if (slides.length > 0) {
        slides[0].classList.add("active");
        let currentIndex = 0;
        setInterval(() => {
          slides[currentIndex].classList.remove("active");
          currentIndex = (currentIndex + 1) % slides.length;
          slides[currentIndex].classList.add("active");
        }, 5000);
      }
    })
    .catch((error) => {
      console.error("Ошибка при загрузке карусели:", error);
    });
}
loadCarousel();

/* ---------- Секция Trending ---------- */
function loadTrending() {
  const trendingContainer = document.getElementById("trending-container");
  trendingContainer.innerHTML = "";
  getDocs(animeCollection.where("sections", "array-contains", "trending"))
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const card = document.createElement("a");
        card.className = "anime-card";
        card.href = "#"; // ссылка на подробную страницу, если нужно
        const img = document.createElement("img");
        img.src = data.cover || "https://via.placeholder.com/140x210?text=No+Image";
        img.alt = data.title || "Anime Title";
        card.appendChild(img);
        const title = document.createElement("div");
        title.className = "anime-title";
        title.textContent = data.title || "No Title";
        card.appendChild(title);
        trendingContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Ошибка при загрузке Trending:", error);
    });
}
loadTrending();

/* ---------- Секция Continue Watching ---------- */
function loadContinue() {
  const continueContainer = document.getElementById("continue-container");
  continueContainer.innerHTML = "";
  getDocs(animeCollection.where("sections", "array-contains", "continue_watching"))
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const card = document.createElement("a");
        card.className = "anime-card";
        card.href = "#";
        const img = document.createElement("img");
        img.src = data.cover || "https://via.placeholder.com/140x210?text=No+Image";
        img.alt = data.title || "Anime Title";
        card.appendChild(img);
        const title = document.createElement("div");
        title.className = "anime-title";
        title.textContent = data.title || "No Title";
        card.appendChild(title);
        continueContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Ошибка при загрузке Continue Watching:", error);
    });
}
loadContinue();

/* ---------- Секция Recommendations ---------- */
function loadRecommendations() {
  const recommendContainer = document.getElementById("recommend-container");
  recommendContainer.innerHTML = "";
  getDocs(animeCollection.where("sections", "array-contains", "recommendations"))
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const card = document.createElement("a");
        card.className = "anime-card";
        card.href = "#";
        const img = document.createElement("img");
        img.src = data.cover || "https://via.placeholder.com/140x210?text=No+Image";
        img.alt = data.title || "Anime Title";
        card.appendChild(img);
        const title = document.createElement("div");
        title.className = "anime-title";
        title.textContent = data.title || "No Title";
        card.appendChild(title);
        recommendContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Ошибка при загрузке Recommendations:", error);
    });
}
loadRecommendations();

/* ---------- Функция загрузки файла (для обложек и баннеров) ---------- */
async function uploadFile(file, folder) {
  const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

/* ---------- Обработчик формы добавления/редактирования аниме ---------- */
document.getElementById("anime-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("anime-title").value.trim();
  const desc = document.getElementById("anime-desc").value.trim();
  const coverURLInput = document.getElementById("anime-cover").value.trim();
  const category = document.getElementById("anime-category").value;
  const rating = document.getElementById("anime-rating").value;
  const playerLink = document.getElementById("anime-player").value.trim();

  const coverFileInput = document.getElementById("cover-file");
  let coverURL = coverURLInput;
  if (coverFileInput.files.length > 0) {
    try {
      coverURL = await uploadFile(coverFileInput.files[0], "covers");
    } catch (error) {
      console.error("Ошибка при загрузке обложки:", error);
      alert("Ошибка при загрузке обложки.");
      return;
    }
  }

  // Собираем выбранные разделы
  const sections = [];
  document.querySelectorAll('input[type="checkbox"][id^="section-"]').forEach(chk => {
    if (chk.checked) sections.push(chk.value);
  });
  if (sections.length === 0) {
    alert("Укажите хотя бы один раздел (например, trending)!");
    return;
  }
  if (!title) {
    alert("Название аниме обязательно!");
    return;
  }
  try {
    if (editingAnimeId) {
      await updateDoc(doc(db, "anime", editingAnimeId), { title, desc, cover: coverURL, category, rating, playerLink, sections });
      alert("Аниме обновлено!");
      editingAnimeId = null;
    } else {
      await addDoc(animeCollection, { title, desc, cover: coverURL, category, rating, playerLink, sections });
      alert("Аниме успешно добавлено!");
    }
    document.getElementById("anime-form").reset();
    loadAnimeList();
  } catch (error) {
    console.error("Ошибка при сохранении аниме:", error);
    alert("Ошибка при сохранении аниме.");
  }
});

/* ---------- Обработчик формы для добавления баннера карусели ---------- */
document.getElementById("carousel-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const bannerLink = document.getElementById("banner-link").value.trim();
  const bannerLinkInput = document.getElementById("banner-image-link").value.trim();
  const bannerFileInput = document.getElementById("banner-file");
  let bannerImageURL = bannerLinkInput;
  if (bannerFileInput.files.length > 0) {
    try {
      bannerImageURL = await uploadFile(bannerFileInput.files[0], "carouselBanners");
    } catch (error) {
      console.error("Ошибка при загрузке баннера:", error);
      alert("Ошибка при загрузке баннера.");
      return;
    }
  }
  if (!bannerImageURL || !bannerLink) {
    alert("Заполните все поля баннера!");
    return;
  }
  try {
    await addDoc(carouselCollection, { image: bannerImageURL, link: bannerLink });
    alert("Баннер успешно добавлен!");
    document.getElementById("carousel-form").reset();
    loadCarouselBanners();
  } catch (error) {
    console.error("Ошибка при добавлении баннера:", error);
    alert("Ошибка при добавлении баннера.");
  }
});

/* ---------- Функция загрузки баннеров карусели (админ-панель) ---------- */
async function loadCarouselBanners() {
  const tableBody = document.getElementById("carousel-table-body");
  tableBody.innerHTML = "";
  try {
    const querySnapshot = await getDocs(carouselCollection);
    querySnapshot.forEach(docSnap => {
      const data = docSnap.data();
      const docId = docSnap.id;
      renderCarouselRow(docId, data);
    });
  } catch (error) {
    console.error("Ошибка при загрузке баннеров:", error);
  }
}

function renderCarouselRow(docId, data) {
  const tr = document.createElement("tr");
  const tdImage = document.createElement("td");
  tdImage.innerHTML = `<img src="${data.image ? data.image : 'https://via.placeholder.com/100x50?text=No+Image'}" alt="Banner" style="width:100px;">`;
  tr.appendChild(tdImage);
  const tdLink = document.createElement("td");
  tdLink.innerHTML = `<a href="${data.link}" target="_blank">${data.link}</a>`;
  tr.appendChild(tdLink);
  const tdActions = document.createElement("td");
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Удалить";
  btnDelete.classList.add("btn-action");
  btnDelete.addEventListener("click", async () => {
    if (confirm("Удалить этот баннер?")) {
      try {
        await deleteDoc(doc(db, "carouselBanners", docId));
        alert("Баннер удалён!");
        loadCarouselBanners();
      } catch (error) {
        console.error("Ошибка при удалении баннера:", error);
        alert("Ошибка при удалении баннера!");
      }
    }
  });
  tdActions.appendChild(btnDelete);
  tr.appendChild(tdActions);
  document.getElementById("carousel-table-body").appendChild(tr);
}

/* ---------- Обработка навигации в sidebar ---------- */
const navBtns = document.querySelectorAll(".nav-btn");
const sectionsDOM = document.querySelectorAll(".section");
navBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    navBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    sectionsDOM.forEach(sec => sec.classList.remove("active"));
    const sectionId = btn.getAttribute("data-section") + "-section";
    document.getElementById(sectionId).classList.add("active");
  });
});

// Начальная загрузка данных в админ-панели
loadAnimeList();
loadCarouselBanners();
</script>
</body>
</html>
